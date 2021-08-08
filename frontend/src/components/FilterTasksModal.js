import { Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterTasks } from '../actions/tasks';
import React, { useState } from 'react';

import ReactTags from 'react-tag-autocomplete';

const FilterTasksModal = ({ show, handleClose, toggleClearFiltersButton, toggleToast, filterTasks }) => {
  const getFilters = (title = '', description = '', deadline = '', creation_date = '', completed = '', tags = '') => {
    var filters = {};
    if (title !== '') {
      filters.title = title;
    }
    if (description !== '') {
      filters.description = description;
    }
    if (deadline !== '') {
      filters.deadline = deadline;
    }
    if (creation_date !== '') {
      filters.creation_date = creation_date;
    }
    if (completed !== '') {
      filters.completed = completed;
    }
    if (tags !== '') {
      filters.tags = tags;
    }
    return filters;
  };

  const getTagsToFilter = formElements => {
    var i = 5;
    var tagsToFilter = '';
    var extractingTags = true;
    while (extractingTags) {
      var tagElement = formElements[i];
      if (tagElement.children !== undefined && tagElement.children.length > 0) {
        tagsToFilter += tagElement.children[0].textContent;
        tagsToFilter += ',';
        i++;
      } else {
        extractingTags = false;
      }
    }
    return tagsToFilter;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const filters = getFilters(
      formElements[0].value,
      formElements[1].value,
      formElements[2].value,
      formElements[3].value,
      formElements[4].value,
      getTagsToFilter(formElements)
    );
    filterTasks(filters, toggleToast);
    handleClose();
    toggleClearFiltersButton();
    // const form = event.currentTarget;
    // event.preventDefault(); // Default submit just refreshes the page, so we prevent it.
    // if (form.checkValidity() === false) {
    //   event.stopPropagation();
    // } else {
    //   const formElements = form.elements;
    //   const editedTask = formatTask(formElements[0].value, formElements[1].value, formElements[2].value, taskId, false);
    //   editTask(editedTask, toggleToast);
    //   handleClose();
    // }
  };

  const [tags, setTags] = useState([]);
  var reactTags = React.createRef();

  var onDelete = i => {
    var newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  };

  var onAddition = tag => {
    var newTags = [].concat(tags, tag);
    setTags(newTags);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Group controlId='formTaskTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' />
            </Form.Group>
            <Form.Group controlId='formTaskDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' />
            </Form.Group>
            <Form.Group controlId='formTaskDeadline'>
              <Form.Label>Deadline</Form.Label>
              <Form.Control type='date' />
            </Form.Group>
            <Form.Group controlId='formTaskCreationDate'>
              <Form.Label>Creation Date</Form.Label>
              <Form.Control type='date' />
            </Form.Group>
            <Form.Group controlId='formTaskComlpeted'>
              <Form.Label>Completed</Form.Label>
              <Form.Control as='select' aria-label='Completed' placeholder='False'>
                <option value='False'>False</option>
                <option value='True'>True</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formTaskDeadline'>
              <Form.Label>Tags</Form.Label>
              <ReactTags
                ref={reactTags}
                tags={tags}
                suggestions={[]}
                onDelete={onDelete}
                onAddition={onAddition}
                allowNew={true}
              />{' '}
            </Form.Group>
            <Button variant='primary' type='submit'>
              Filter
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  var toggleToast = state.toggleToast;

  return { toggleToast };
};

export default connect(mapStateToProps, { filterTasks })(FilterTasksModal);

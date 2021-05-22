import { Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editTask } from '../actions';

// We pass the action creator createTask via redux's global state, and the rest of the params via the App's state since the rest of our application doesn't need to know those details.
const EditTaskModal = ({ show, handleClose, task, toggleToast, editTask }) => {
  const handleSubmit = (event, taskId) => {
    const form = event.currentTarget;
    event.preventDefault(); // Default submit just refreshes the page, so we prevent it.
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formElements = form.elements;
      editTask(formElements[0].value, formElements[1].value, formElements[2].value, taskId, toggleToast);
      handleClose();
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => handleSubmit(e, task.id)}>
            <Form.Group controlId='formTaskTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' defaultValue={task.title} />
            </Form.Group>
            <Form.Group controlId='formTaskDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control type='text' defaultValue={task.description} />
            </Form.Group>
            <Form.Group controlId='formTaskDeadline'>
              <Form.Label>Deadline</Form.Label>
              <Form.Control type='date' defaultValue={task.deadline} />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Edit
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
  const { show, handleClose, task, toggleToast } = ownProps;
  return { show, handleClose, task, toggleToast };
};

export default connect(mapStateToProps, { editTask: editTask })(EditTaskModal);

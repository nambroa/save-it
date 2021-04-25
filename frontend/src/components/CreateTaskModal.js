import { Button, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createTask } from '../actions';

// We pass the action creator createTask via redux's global state, and the rest of the params via the App's state since the rest of our application doesn't need to know those details.
const CreateTaskModal = ({ createTask, show, handleClose, toggleTaskCreatedToast }) => {
  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault(); // Default submit just refreshes the page, so we prevent it.
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formElements = form.elements;
      createTask(
        formElements[0].value,
        formElements[1].value,
        formElements[2].value,
        toggleTaskCreatedToast
      );
      handleClose();
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Task Title" />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Task Description" />
            </Form.Group>
            <Form.Group controlId="formTaskDeadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    taskCreatedSuccessfully: state.createTask.taskCreatedSuccessfully,
    show: ownProps.show,
    handleClose: ownProps.handleClose,
    toggleTaskCreatedToast: ownProps.toggleTaskCreatedToast,
  };
};

export default connect(mapStateToProps, { createTask: createTask })(CreateTaskModal);

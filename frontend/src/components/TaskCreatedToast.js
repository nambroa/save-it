import { Toast } from 'react-bootstrap';

const TaskCreatedToast = ({ show, handleClose }) => {
  return (
    <div>
      <Toast
        delay={2500}
        onClose={() => handleClose()}
        autohide
        show={show}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'green',
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Task Created Successfully</strong>
        </Toast.Header>
      </Toast>
    </div>
  );
};
export default TaskCreatedToast;

import { Toast } from 'react-bootstrap';

const CustomToast = ({ show, handleClose, headerMessage, backgroundColor }) => {
  return (
    <div>
      <Toast
        delay={4000}
        onClose={() => handleClose()}
        autohide
        show={show}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: `${backgroundColor}`,
        }}>
        <Toast.Header>
          <strong className='mr-auto'>{headerMessage}</strong>
        </Toast.Header>
      </Toast>
    </div>
  );
};
export default CustomToast;

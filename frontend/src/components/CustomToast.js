import { Toast } from 'react-bootstrap';
import { useState } from 'react';
import { connect } from 'react-redux';
import { sendToastToStore } from '../actions/toasts/index';

const CustomToast = ({ sendToastToStore }) => {
  var [toggleCustomToast, setToggleCustomToast] = useState(false);
  var [headerMessage, setHeaderMessage] = useState('');
  var [backgroundColor, setBackgroundColor] = useState('green');
  const toggleToast = (backgroundColor, headerMessage) => {
    setBackgroundColor(backgroundColor);
    setHeaderMessage(headerMessage);
    setToggleCustomToast(true);
  };
  sendToastToStore(toggleToast);

  return (
    <div>
      <Toast
        delay={4000}
        onClose={() => setToggleCustomToast(false)}
        autohide
        show={toggleCustomToast}
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
const mapStateToProps = (state, ownProps) => {
  return {};
};
export default connect(mapStateToProps, { sendToastToStore })(CustomToast);

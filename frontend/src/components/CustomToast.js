import { Toast } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendToastToStore } from '../actions/toasts/index';

const CustomToast = ({ sendToastToStore }) => {
  var [toggleCustomToast, setToggleCustomToast] = useState(false);
  var [headerMessage, setHeaderMessage] = useState('');
  var [backgroundColor, setBackgroundColor] = useState('green');
  const toggleToast = (backgroundColor, headerMessage) => {
    // debugger;
    setBackgroundColor(backgroundColor);
    setHeaderMessage(headerMessage);
    setToggleCustomToast(true);
  };
  // This is done inside the useEffect function to prevent a rerender loop. Otherwise the case below happens"
  // If a component takes this action from the redux store, and uses it, it will call toggleToast.
  // ToggleToast uses setState, which triggers a rerender of the CustomToast component.
  // The rerender without useEffect in place would then call sendToastToStore again. This
  useEffect(() => {
    sendToastToStore(toggleToast);
  }, []);

  console.log('rerendering customtoast');

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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import Tasklist from './Tasklist';
import CreateTaskModal from './CreateTaskModal';
import TaskSorter from './TaskSorter';

import CustomToast from './CustomToast';

const App = () => {
  const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  var [toggleTaskCreatedToast, setToggleTaskCreatedToast] = useState(false);
  return (
    <div>
      <CreateTaskModal
        show={toggleCreateTaskModal}
        handleClose={() => setToggleCreateTaskModal(false)}
        toggleTaskCreatedToast={() => setToggleTaskCreatedToast(true)}
      />
      <CustomToast
        show={toggleTaskCreatedToast}
        handleClose={() => setToggleTaskCreatedToast(false)}
        headerMessage='Task Created Successfully'
        backgroundColor='green'></CustomToast>
      <div style={{ display: 'flex' }}>
        <Button size='lg' variant='success' onClick={() => setToggleCreateTaskModal(true)}>
          Create Task
        </Button>{' '}
        <TaskSorter></TaskSorter>
      </div>
      <Tasklist />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(App);

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FunnelFill } from 'react-bootstrap-icons';

import { getTasks } from '../actions/tasks';
import Tasklist from './Tasklist';
import CreateTaskModal from './CreateTaskModal';
import TaskSorter from './TaskSorter';
import CustomToast from './CustomToast';
import FilterTasksModal from './FilterTasksModal';

const App = ({ toggleToast, getTasks }) => {
  const [toggleCreateTaskModal, setToggleCreateTaskModal] = useState(false);
  const [toggleFilterTasksModal, setToggleFilterTasksModal] = useState(false);
  const [toggleClearFiltersButton, setToggleClearFiltersButton] = useState(false);
  const openFilterTasksModal = () => {
    setToggleFilterTasksModal(true);
  };
  const closeFilterTasksModal = () => {
    setToggleFilterTasksModal(false);
    setToggleClearFiltersButton(false);
  };
  const clearFilters = () => {
    setToggleFilterTasksModal(false);
    setToggleClearFiltersButton(false);
    getTasks(toggleToast);
  };
  return (
    <div>
      <CustomToast></CustomToast>
      <CreateTaskModal show={toggleCreateTaskModal} handleClose={() => setToggleCreateTaskModal(false)} />
      <FilterTasksModal
        show={toggleFilterTasksModal}
        handleClose={closeFilterTasksModal}
        toggleClearFiltersButton={() => setToggleClearFiltersButton(true)}></FilterTasksModal>

      <div style={{ display: 'flex' }}>
        <Button size='lg' variant='success' onClick={() => setToggleCreateTaskModal(true)}>
          Create Task
        </Button>{' '}
        <TaskSorter></TaskSorter>
        <Button size='lg' variant='info' onClick={openFilterTasksModal}>
          <FunnelFill size={22}></FunnelFill> Filter Tasks
        </Button>{' '}
        {toggleClearFiltersButton && (
          <Button size='lg' variant='warning' onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>
      <Tasklist />
    </div>
  );
};

const mapStateToProps = state => {
  var toggleToast = state.toggleToast;

  return { toggleToast };
};

export default connect(mapStateToProps, { getTasks })(App);

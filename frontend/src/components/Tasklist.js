import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, XCircle, CheckCircle, SlashCircle } from 'react-bootstrap-icons';

import { getTasks, deleteTask, completeTask } from '../actions/tasks';
import EditTaskModal from './EditTaskModal';
import CustomToast from './CustomToast';
import TagsContainer from './TagsContainer/TagsContainer';

// For data loading into a component, its good to remember
// Call action creator from componentDidMount, and the creator inside runs the api request
// Api responds and the creator returns an action with the fetched data on the 'payload' property
// Some reducer sees the actions, returns the data off the 'payload'
// Since we generated a new state object, react-redux causes our React app to be rerendered

// GetTasks is an action creator, received via the connect function
const Tasklist = ({ getTasks, deleteTask, completeTask, tasks }) => {
  const [toggleEditTaskModal, setToggleEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  var [toggleCustomToast, setToggleCustomToast] = useState(false);
  var [headerMessage, setHeaderMessage] = useState('');
  var [backgroundColor, setBackgroundColor] = useState('green');

  useEffect(() => {
    // This will be translated to store.dispatch(getTasks()) inside of redux.
    getTasks(toggleToast);
  }, [getTasks]);

  const toggleToast = (backgroundColor, headerMessage) => {
    setBackgroundColor(backgroundColor);
    setHeaderMessage(headerMessage);
    setToggleCustomToast(true);
  };

  const openEditTaskModalWithTaskData = (task, setSelectedTask, setToggleEditTaskModal) => {
    setSelectedTask(task);
    setToggleEditTaskModal(true);
  };

  const renderTasks = (tasks, setSelectedTask, setToggleEditTaskModal, deleteTask, toggleToast, completeTask) => {
    return tasks.map(task => (
      <tr key={task.id}>
        <td style={{ width: '13%' }}>
          <Button
            variant='primary'
            onClick={() => openEditTaskModalWithTaskData(task, setSelectedTask, setToggleEditTaskModal)}>
            <PencilSquare size={22}></PencilSquare>
          </Button>{' '}
          {!task.completed && (
            <Button variant='success' onClick={() => completeTask(task, toggleToast, true)}>
              <CheckCircle size={22}></CheckCircle>
            </Button>
          )}{' '}
          {task.completed && (
            <Button variant='warning' onClick={() => completeTask(task, toggleToast, false)}>
              <SlashCircle size={22} color='white'></SlashCircle>
            </Button>
          )}{' '}
          <Button variant='danger' onClick={() => deleteTask(task.id, toggleToast)}>
            <XCircle size={22}></XCircle>
          </Button>{' '}
        </td>
        <td>{new Date(task.creation_date).toLocaleDateString()}</td>
        <td>{task.title}</td>
        <td>
          <TagsContainer taskTags={task.tags}></TagsContainer>
        </td>
        <td>{new Date(task.deadline).toLocaleDateString()}</td>
        <td>{String(task.completed)}</td>
      </tr>
    ));
  };

  return (
    <div>
      <EditTaskModal
        show={toggleEditTaskModal}
        handleClose={() => setToggleEditTaskModal(false)}
        task={selectedTask}
        toggleToast={() => toggleToast('green', 'Task Edited Successfully')}></EditTaskModal>
      <CustomToast
        headerMessage={headerMessage}
        show={toggleCustomToast}
        handleClose={() => setToggleCustomToast(false)}
        backgroundColor={backgroundColor}></CustomToast>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Created on</th>
            <th>Title</th>
            <th>Tags</th>
            <th>Deadline</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {renderTasks(tasks, setSelectedTask, setToggleEditTaskModal, deleteTask, toggleToast, completeTask)}
        </tbody>
      </Table>
    </div>
  );
};

// Run through the redux store, get some specific data and give it to this component's props.
// All of the redux store = all of the returns of the reducers
const mapStateToProps = (state, ownProps) => {
  var tasks = []; // First time the reducer gets called, getTasks.data will be empty
  if (state.getTasks.data) {
    tasks = state.getTasks.data;
  }
  return { tasks }; // state.getTasks is called that way because the reducer is called getTasks in combineReducers.
};

// you give it a function to access data from the store and give it to the component
// and another object with functions that will send data TO the store
export default connect(mapStateToProps, { getTasks, deleteTask, completeTask })(Tasklist);

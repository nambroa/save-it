import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { PencilSquare, XCircle, CheckCircle, SlashCircle } from 'react-bootstrap-icons';

import { getTasks, deleteTask, completeTask } from '../actions/tasks';
import { getTags } from '../actions/tags';
import EditTaskModal from './EditTaskModal';
import TagsContainer from './TagsContainer/TagsContainer';
import TasklistHeaders from './TasklistHeaders';

// For data loading into a component, its good to remember
// Call action creator from componentDidMount, and the creator inside runs the api request
// Api responds and the creator returns an action with the fetched data on the 'payload' property
// Some reducer sees the actions, returns the data off the 'payload'
// Since we generated a new state object, react-redux causes our React app to be rerendered

const Tasklist = ({ getTasks, deleteTask, completeTask, getTags, tasks, toggleToast, tags }) => {
  const [toggleEditTaskModal, setToggleEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  useEffect(() => {
    // This will be translated to store.dispatch(getTasks()) inside of redux.
    getTasks(toggleToast);
    // Warning below needed since I don't want to call the action creator in each rerender.
    // (And it would otherwise do so, since the function is an object and thus changes every rerender)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getTags(toggleToast);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openEditTaskModalWithTaskData = (task, setSelectedTask, setToggleEditTaskModal) => {
    setSelectedTask(task);
    setToggleEditTaskModal(true);
  };

  const renderTasks = (setSelectedTask, setToggleEditTaskModal, deleteTask, toggleToast, completeTask) => {
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
        <td>{task.creation_date}</td>
        <td>{task.title}</td>
        <td>
          <TagsContainer taskTags={task.tags} task={task}></TagsContainer>
        </td>
        <td>{task.deadline}</td>
        <td>{String(task.completed)}</td>
      </tr>
    ));
  };
  return (
    <div>
      <EditTaskModal
        show={toggleEditTaskModal}
        handleClose={() => setToggleEditTaskModal(false)}
        task={selectedTask}></EditTaskModal>
      <Table striped bordered hover>
        <TasklistHeaders></TasklistHeaders>
        <tbody>{renderTasks(setSelectedTask, setToggleEditTaskModal, deleteTask, toggleToast, completeTask)}</tbody>
      </Table>
    </div>
  );
};

// Run through the redux store, get some specific data and give it to this component's props.
// All of the redux store = all of the returns of the reducers
const mapStateToProps = (state, ownProps) => {
  var tasks = []; // First time the reducer gets called, getTasks.data will be empty
  var toggleToast = state.toggleToast;
  if (state.getTasks.data) {
    tasks = state.getTasks.data; // state.getTasks is called that way because the reducer is called getTasks in combineReducers
  }

  return { tasks, toggleToast };
};

// you give it a function to access data from the store and give it to the component
// and another object with functions that will send data TO the store
export default connect(mapStateToProps, { getTasks, deleteTask, completeTask, getTags })(Tasklist);

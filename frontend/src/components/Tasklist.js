import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTasks } from '../actions';
import { Table } from 'react-bootstrap';

// For data loading into a component, its good to remember
// Call action creator from componentDidMount, and the creator inside runs the api request
// Api responds and the creator returns an action with the fetched data on the 'payload' property
// Some reducer sees the actions, returns the data off the 'payload'
// Since we generated a new state object, react-redux causes our React app to be rerendered

const renderTasks = tasks => {
  return tasks.map(task => (
    <tr key={task.id}>
      <td>{new Date(task.creation_date).toLocaleDateString()}</td>
      <td>{task.title}</td>
      <td>{new Date(task.deadline).toLocaleDateString()}</td>
      <td>{String(task.completed)}</td>
    </tr>
  ));
};

// GetTasks is an action creator, received via the connect function
const Tasklist = ({ getTasks, tasks }) => {
  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // This will be translated to store.dispatch(getTasks()) inside of redux.
    getTasks();
  }, [getTasks]);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Created on</th>
            <th>Title</th>
            <th>Deadline</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>{renderTasks(tasks)}</tbody>
      </Table>
    </div>
  );
};

// Run through the redux store, get some specific data and give it to this component's props.
// All of the redux store = all of the returns of the reducers
const mapStateToProps = state => {
  return { tasks: state.getTasks }; // state.getTasks is called that way because the reducer is called getTasks in combineReducers.
};

// you give it a function to access data from the store and give it to the component
// and another object with functions that will send data TO the store
export default connect(mapStateToProps, { getTasks: getTasks })(Tasklist);

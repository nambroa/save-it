import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import Tasklist from './Tasklist';
import CreateTaskModal from './CreateTaskModal';
import TaskCreatedToast from './TaskCreatedToast';

// TODO: USA REACT BOOTSTRAP NO REACTSTRAP
// const emptyTask = {title: "", description: "", completed: false, deadline: "", creation_date: ""}
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // Los de Nico
//       tasksWithActionDropdownOpen: {},
//       taskList: [],
//     };
//   }
//
//   componentDidMount() {
//     this.refreshList();
//   }
//
//   refreshList = () => {
//     axios
//       .get("/api/tasks/")
//       .then((res) => this.setState({ taskList: res.data }))
//       .catch((err) => console.log(err));
//   };
//
//   handleSubmit = (item) => {
//     this.toggle();
//
//     if (item.id) {
//       axios
//         .put(`/api/tasks/${item.id}/`, item)
//         .then((res) => this.refreshList());
//       return;
//     }
//     axios
//       .post("/api/tasks/", item)
//       .then((res) => this.refreshList());
//   };
//
//   handleDelete = (item) => {
//     axios
//       .delete(`/api/tasks/${item.id}/`)
//       .then((res) => this.refreshList());
//   };
//
//
//   toggleTaskActionsDropdown = (taskId) => {
//     const newTasksWithActionDropdownOpen = extend({}, this.state.tasksWithActionDropdownOpen, {[taskId]: true});
//     this.setState({tasksWithActionDropdownOpen: newTasksWithActionDropdownOpen});
//   }
//
//   isTaskActionDropdownOpen = (taskId) => {
//     return this.state.tasksWithActionDropdownOpen.hasOwnProperty(taskId);
//   }
//
//   closeTaskActionsDropdown = (taskId) => {
//     const {[taskId]: _, ...newTasksWithActionDropdownOpen} = this.state.tasksWithActionDropdownOpen;
//     this.setState({tasksWithActionDropdownOpen: newTasksWithActionDropdownOpen});
//   }
//
//   renderTaskHeaders = () => {
//     return (
//         <Row xs="5">
//           <Col xs="1" onClick={() => this.isTaskActionDropdownOpen(34)}>Creation Date</Col>
//           <Col><Button>Title</Button></Col>
//           <Col ><Button>Deadline</Button></Col>
//           <Col><Button>Completed</Button></Col>
//           <Col><Button>Actions</Button></Col>
//         </Row>
//     )
//   };
//
//   renderTasks = () => {
//     // Mostramos primero las incompletas
//     const incompleteTasks = this.state.taskList.filter(task => !task.completed);
//     // Despues las completas
//     const allTasks = incompleteTasks.concat(this.state.taskList.filter(task => task.completed));
//
//     return allTasks.map(task =>
//       <Row xs="5" className="border" key={task.id}>
//         <Col xs="1" className="border">{new Date(task.creation_date).toLocaleDateString()}</Col>
//         <Col className="border">{task.title}</Col>
//         <Col xs="1" className="border">{new Date(task.deadline).toLocaleDateString()}</Col>
//         <Col className="border">{task.completed.toString()}</Col>
//         <Dropdown group isOpen={this.isTaskActionDropdownOpen(task.id)} toggle={() => this.toggleTaskActionsDropdown(task.id)} onBlur={() => this.closeTaskActionsDropdown(task.id)}>
//           <DropdownToggle caret>
//             Actions
//           </DropdownToggle>
//           <DropdownMenu>
//             <DropdownItem>Complete</DropdownItem>
//             <DropdownItem>Delete</DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </Row>
//     )
//
//   }
//
//   render() {
//     console.log(this.state.tasksWithActionDropdownOpen);
//     return (
//         // Nota para Nico: STYLED COMPONENTS! Si queres modificar algo.
//         <Container>
//           {this.renderTaskHeaders()}
//           {this.renderTasks()}
//         </Container>
//     );
//   }
// }

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
      <TaskCreatedToast
        show={toggleTaskCreatedToast}
        handleClose={() => setToggleTaskCreatedToast(false)}
      ></TaskCreatedToast>
      <Button variant="primary" onClick={() => setToggleCreateTaskModal(true)}>
        Create Task
      </Button>
      <Tasklist />
    </div>
  );
};

const mapStateToProps = state => {
  console.log('APP STATE');
  console.log(state);
  return {};
};

export default connect(mapStateToProps, {})(App);

import { connect } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { sortTasks } from '../actions';

const TaskSorter = ({ sortTasks }) => {
  return (
    <div>
      <DropdownButton size='lg' id='task-filter-dropdown-button' title='Sort by..'>
        <Dropdown.Item as='button' onClick={() => sortTasks('deadline')}>
          Nearest Deadline
        </Dropdown.Item>
        <Dropdown.Item as='button' onClick={() => sortTasks('creation_date')}>
          Newest Creation Date
        </Dropdown.Item>
        <Dropdown.Item as='button' onClick={() => sortTasks('tag')}>
          Tag
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {};
};
export default connect(mapStateToProps, { sortTasks })(TaskSorter);

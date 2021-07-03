import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl } from 'react-bootstrap';
import { filterTasks } from '../actions/tasks/index';

const EditableTableHeader = ({ headerName, fieldName, toggleToast, filterTasks }) => {
  var headerRef = useRef(null);
  var [toggleEditableHeader, setToggleEditableHeader] = useState(false);
  var [filterValue, setFilterValue] = useState('');

  const makeHeaderEditable = () => {
    setToggleEditableHeader(true);
    headerRef.current.focus();
  };

  useEffect(() => {
    headerRef.current.focus();
  }, [toggleEditableHeader]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      filterTasks({ field: fieldName, value: filterValue });
      // Send Axios request here
    }, 800);
    // From React documentation
    // Why did we return a function from our effect? This is the optional cleanup mechanism for effects.
    // Every effect may return a function that cleans up after it.
    // This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect!

    //When exactly does React clean up an effect? React performs the cleanup when the component unmounts.
    // However, as we learned earlier, effects run for every render and not just once.
    // This is why React also cleans up effects from the previous render before running the effects next time

    // So that's why, after typing a second letter, the return function is executed and the timeout cleared and recreated.
    // So it does not search for the first typed letter.
    return () => clearTimeout(delayDebounceFn);
  }, [filterValue]);

  return (
    <th>
      <div>
        <InputGroup
          size='sm'
          onBlur={() => setToggleEditableHeader(false)}
          style={{ display: toggleEditableHeader ? '' : 'none' }}>
          <FormControl
            style={{ width: 'fit-content' }}
            ref={headerRef}
            placeholder={headerName}
            onChange={e => setFilterValue(e.target.value)}></FormControl>
        </InputGroup>
        <div style={{ display: toggleEditableHeader ? 'none' : '' }} onClick={() => makeHeaderEditable()}>
          {headerName}
        </div>
      </div>
    </th>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { toggleToast } = state;
  return { toggleToast };
};

export default connect(mapStateToProps, { filterTasks })(EditableTableHeader);

import React from 'react';
import { connect } from 'react-redux';
import EditableTableHeader from './EditableTableHeader';

const TasklistHeaders = ({}) => {
  return (
    <thead>
      <tr>
        <th>Actions</th>
        <th>Created on</th>
        <EditableTableHeader headerName='Title' fieldName='title'></EditableTableHeader>
        <EditableTableHeader headerName='Tags' fieldName='tags'></EditableTableHeader>
        <th>Deadline</th>
        <EditableTableHeader headerName='Completed' fieldName='completed'></EditableTableHeader>
      </tr>
    </thead>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps, {})(TasklistHeaders);

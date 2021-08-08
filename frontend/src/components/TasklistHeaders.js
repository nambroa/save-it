import React from 'react';
import { connect } from 'react-redux';
import EditableTableHeader from './EditableTableHeader';
import EditableDateTableHeader from './EditableDateTableHeader';

const TasklistHeaders = () => {
  return (
    <thead>
      <tr>
        <th>Actions</th>
        <EditableDateTableHeader
          headerName='Creation Date'
          fieldName='creation_date'
          fieldType='date'
          filterDelay={900}></EditableDateTableHeader>
        <EditableTableHeader
          headerName='Title'
          fieldName='title'
          fieldType='string'
          filterDelay={800}></EditableTableHeader>
        <EditableTableHeader
          headerName='Tags'
          fieldName='tags'
          fieldType='string'
          filterDelay={800}></EditableTableHeader>
        <EditableDateTableHeader
          headerName='Deadline'
          fieldName='deadline'
          fieldType='date'
          filterDelay={900}></EditableDateTableHeader>
        <EditableTableHeader
          headerName='Completed'
          fieldName='completed'
          fieldType='string'
          filterDelay={800}></EditableTableHeader>
      </tr>
    </thead>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps, {})(TasklistHeaders);

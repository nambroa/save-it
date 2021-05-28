import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';

import { getTags } from '../../actions/tags';
import './TagsContainer.css';
const TagsContainer = ({ getTags, taskTags }) => {
  console.log(taskTags);
  const [tags, setTags] = useState([
    // { id: 1, name: 'Apples' },
    // { id: 2, name: 'Cherries' },
    ...taskTags,
  ]);
  const [tagSuggestions, setTagSuggestions] = useState([
    { id: 3, name: 'Bananas' },
    { id: 4, name: 'Mangos' },
    { id: 5, name: 'Lemons' },
    { id: 6, name: 'Apricots' },
  ]);
  var reactTags = React.createRef();

  var onDelete = i => {
    var newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  };

  var onAddition = tag => {
    var newTags = [].concat(tags, tag);
    setTags(newTags);
  };
  return (
    <ReactTags ref={reactTags} tags={tags} suggestions={tagSuggestions} onDelete={onDelete} onAddition={onAddition} />
  );
};

const mapStateToProps = (state, ownProps) => {
  const { taskTags } = ownProps;
  return { taskTags };

  return {};
};
export default connect(mapStateToProps, { getTags })(TagsContainer);

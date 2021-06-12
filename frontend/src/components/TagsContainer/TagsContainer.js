import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';

import { getTags, createTag } from '../../actions/tags';
import { editTask } from '../../actions/tasks';
import './TagsContainer.css';

const TagsContainer = ({ getTags, createTag, editTask, taskTags, task, toggleEditTaskToast, allTags }) => {
  var reactTags = React.createRef();
  const getAllTagSuggestions = () => {
    if (allTags) {
      return allTags.filter(tag => !taskTags.map(tagg => tagg.id).includes(tag.id));
    }
    return [];
  };

  var allTagSuggestions = getAllTagSuggestions(allTags);
  const [tags, setTags] = useState([...taskTags]);
  const [tagSuggestions, setTagSuggestions] = useState([...allTagSuggestions]);

  useEffect(() => {
    var allTagSuggestions = getAllTagSuggestions(allTags);
    setTagSuggestions(allTagSuggestions);
  }, [allTags]);

  var onDelete = i => {
    var newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  };

  var onAddition = tag => {
    // This function always receives a tag from tagSuggestions, so it will try to create a new tag.
    var newTags = [].concat(tags, tag);
    task.tags = newTags;
    editTask(task, toggleEditTaskToast);
    setTags(newTags);
    setTagSuggestions(tagSuggestions.filter(tagg => tagg.id != tag.id));
  };
  return (
    <ReactTags ref={reactTags} tags={tags} suggestions={tagSuggestions} onDelete={onDelete} onAddition={onAddition} />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { allTags: state.getTags.data };
};

export default connect(mapStateToProps, { getTags, createTag, editTask })(TagsContainer);

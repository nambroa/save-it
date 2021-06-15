import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactTags from 'react-tag-autocomplete';

import { getTags, createTag } from '../../actions/tags';
import { editTask } from '../../actions/tasks';
import './TagsContainer.css';

const TagsContainer = ({ getTags, createTag, editTask, taskTags, task, toggleToast, allTags }) => {
  var reactTags = React.createRef();

  const tagInTagGroupByName = (tag, tagGroup) => {
    return tagGroup.map(tagg => tagg.name).includes(tag.name);
  };

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
    console.log('HELLO!!');
    console.log(tag);
    console.log(tags);
    var newTags = [].concat(tags, tag);
    task.tags = newTags;
    setTags(newTags);
    setTagSuggestions(tagSuggestions.filter(tagg => tagg.id != tag.id));
    if (tagInTagGroupByName(tag, tags)) {
      console.log('Editando task actual..');
      editTask(task, toggleToast);
    } else {
      console.log('Creando nuevo tag..');
      createTag(tag, task);
    }
  };

  return (
    <ReactTags
      ref={reactTags}
      tags={tags}
      suggestions={tagSuggestions}
      onDelete={onDelete}
      onAddition={onAddition}
      allowNew={true}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  var allTags = [];
  var toggleToast = state.toggleToast;
  if (state.getTags.data) {
    allTags = state.getTags.data;
  }

  return { allTags, toggleToast };
};

export default connect(mapStateToProps, { getTags, createTag, editTask })(TagsContainer);

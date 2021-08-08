export const formatTask = (title = '', description = '', deadline = '', taskId = '', completed = false, tags = '') => {
  const task = {
    title: title,
    description: description,
    completed: completed,
    deadline: deadline,
  };
  if (taskId !== '') {
    task.id = taskId;
  }
  if (tags !== '') {
    task.tags = tags;
  }
  return task;
};

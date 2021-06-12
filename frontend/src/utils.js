export const formatTask = (title = '', description = '', deadline = '', taskId = '', completed = false) => {
  const task = {
    title: title,
    description: description,
    completed: false,
    deadline: deadline,
    id: taskId,
  };
  return task;
};

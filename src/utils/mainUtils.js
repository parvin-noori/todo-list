export  function filterTasks(query, tasks) {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(query.toLowerCase())
    );
  }
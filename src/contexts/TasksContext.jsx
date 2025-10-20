import { createContext, useContext, useReducer } from "react";
import { taskReducer } from "./TaskReducer";

export const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];
export const TasksContext = createContext();

function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const store = { tasks, dispatch };

  return (
    <TasksContext.Provider value={store}>{children}</TasksContext.Provider>
  );
}

const useTasksContext = () => useContext(TasksContext);
export { TasksProvider, useTasksContext };

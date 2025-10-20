import { createContext, useContext, useReducer } from "react";

export const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskReducer = function (state, action) {
  let newState;

  switch (action.type) {
    case "ADD_TASK": {
      newState = [...state, action.payload];
      break;
    }
    case "REMOVE_TASK": {
      newState = state.filter((task) => task.id !== action.payload.id);
      break;
    }
    case "TOGGLE_TASK": {
      newState = state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
      break;
    }
    case "EDIT_TASK": {
      newState = state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              name: action.payload.name,
              priority: action.payload.priority,
            }
          : task
      );

      break;
    }
    default: {
      newState = state;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(newState));
  return newState;
};

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

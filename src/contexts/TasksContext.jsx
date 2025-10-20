import { createContext, useReducer } from "react";

export const initialTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskReducer = function (state, action) {
  let newState;

  switch (action.type) {
    case "ADD_TASK": {
      newState = [...state, action.payload];
      return newState;
    }
    case "REMOVE_TASK": {
      newState = state.filter((task) => task.id !== action.payload.id);
      break;
    }
    case "TOGGLE_TASK": {
      newState = state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      break;
    }
    case "EDIT_TASK": {
      newState = state.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            name: action.payload.name,
            priority: action.payload.priority,
          };
        }
        return task;
      });

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

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const store = { tasks, dispatch };

  return (
    <TasksContext.Provider value={store}>{children}</TasksContext.Provider>
  );
}

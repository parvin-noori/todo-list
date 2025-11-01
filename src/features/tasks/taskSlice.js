import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload.id);
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    toggleTask: (state, action) => {
      const newState = state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    editTask: (state, action) => {
      const newState = state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              name: action.payload.name,
              priority: action.payload.priority,
            }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addTask, removeTask, toggleTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;

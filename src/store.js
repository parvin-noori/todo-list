import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice.js";
import taskReducer from "./features/tasks/taskSlice.js";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    theme: themeReducer,
  },
});

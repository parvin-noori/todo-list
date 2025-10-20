import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";
import { TasksProvider } from "./contexts/TasksContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </AppProvider>
  </StrictMode>
);

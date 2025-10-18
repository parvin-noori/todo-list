import React, { useReducer, useState } from "react";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";
import { initialTasks, taskReducer } from "../tasksReducer";
import NewTask from "./NewTask";
import { filterTasks } from "../utils/mainUtils";
import { ToastContainer } from "react-toastify";

export default function Todo() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const results = filterTasks(query, tasks);

  return (
    <div className="backdrop-filter-sm bg-white/30 p-5 rounded-lg w-md gap-y-5 flex flex-col">
      <div className="flex items-center justify-between">
        {/* {console.log(results)} */}
        <SearchBar query={query} setQuery={setQuery} />
        <NewTask
          showModal={showModal}
          setShowModal={setShowModal}
          dispatch={dispatch}
        />
      </div>
      {results.length > 0 ? (
        <TodoList tasks={results} dispatch={dispatch} />
      ) : (
        <span>no results found</span>
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

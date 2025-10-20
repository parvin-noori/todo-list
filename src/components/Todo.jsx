import { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";
import NewTask from "./NewTask";
import { filterTasks } from "../utils/mainUtils";
import { ToastContainer } from "react-toastify";
import { TasksContext } from "../contexts/TasksContext";

export default function Todo() {
  const { tasks } = useContext(TasksContext);
  const [query, setQuery] = useState("");
  const results = filterTasks(query, tasks);

  return (
    <>
      <div className="backdrop-filter-sm bg-white/30 p-5 md:rounded-lg sm:w-md w-full gap-y-5 flex flex-col">
        <div className="flex items-center justify-between gap-x-2">
          <h3 className="text-4xl capitalize text-secondary font-bold">
            task manager
          </h3>
          <NewTask
            tasks={results}
          />
        </div>
        <SearchBar query={query} setQuery={setQuery} />
        {tasks.length === 0 ? (
          <span className="capitalize text-center">no tasks yet</span>
        ) : results.length === 0 ? (
          <span className="capitalize text-center">no results found</span>
        ) : (
          <TodoList tasks={results} />
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}

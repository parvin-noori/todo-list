import { useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "../contexts/AppContext";
import { useTasksContext } from "../contexts/TasksContext";
import { filterTasks } from "../utils/mainUtils";
import NewTask from "./NewTask";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";

export default function Todo() {
  const { tasks } = useTasksContext();
  const { changeTheme, state } = useAppContext();
  const [query, setQuery] = useState("");
  const results = filterTasks(query, tasks);

  return (
    <>
      <div className="backdrop-filter-sm bg-white/30 p-5 md:rounded-lg sm:w-md w-full gap-y-5 flex flex-col">
        <div className="flex items-center sm:justify-between gap-x-2">
          <h3 className="text-4xl capitalize text-secondary dark:text-white font-bold">
            task manager
          </h3>
          <button
            className={`cursor-pointer sm:m-0 ms-auto text-xl sm:fixed sm:top-10 sm:end-10 size-9 grid place-content-center rounded-md p-5 ${
              state.theme === "light"
                ? "bg-secondary text-yellow-500"
                : "bg-primary text-yellow-500"
            }`}
            onClick={() =>
              changeTheme(state.theme === "light" ? "dark" : "light")
            }
          >
            {state.theme === "light" ? <IoMdMoon /> : <MdSunny />}
          </button>
          <NewTask tasks={results} />
        </div>
        <SearchBar query={query} setQuery={setQuery} />
        {results.length !== 0 && (
          <span>
            {results.filter((result) => result.completed).length} / {results.length}{" "}
            tasks completed
          </span>
        )}
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

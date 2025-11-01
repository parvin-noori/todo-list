import { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { changeTheme } from "../themeSlice";
import { filterTasks } from "../../utils/mainUtils";
import NewTask from "../../components/NewTask";
import SearchBar from "../../components/SearchBar";
import TodoList from "./TodoList";

export default function Todo() {
  const tasks = useSelector((state) => state.tasks);
  const theme = useSelector((state) => state.theme.theme);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const results = filterTasks(query, tasks);
  const dispatch = useDispatch();

  //change theme
  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);

  const tabs = [
    { id: "all", label: "all", filter: () => true },
    { id: "completed", label: "completed", filter: (t) => t.completed },
    { id: "pending", label: "pending", filter: (t) => !t.completed },
  ];

  const activeFilter = tabs.find((tab) => tab.id === activeTab).filter;
  const filterResults = results.filter(activeFilter);

  return (
    <>
      <div className="backdrop-filter-sm bg-white/30 p-5 md:rounded-lg sm:w-md w-full gap-y-5 flex flex-col">
        {/* header  */}
        <div className="flex items-center sm:justify-between gap-x-2">
          <h3 className="text-4xl capitalize text-secondary dark:text-white font-bold">
            task manager
          </h3>
          <button
            className={`cursor-pointer sm:m-0 ms-auto text-xl sm:fixed sm:top-10 sm:end-10 size-9 grid place-content-center rounded-md p-5 ${
              theme === "light"
                ? "bg-secondary text-yellow-500"
                : "bg-primary text-yellow-500"
            }`}
            onClick={() =>
              dispatch(changeTheme(theme === "light" ? "dark" : "light"))
            }
          >
            {theme === "light" ? <IoMdMoon /> : <MdSunny />}
          </button>
          <NewTask tasks={results} />
        </div>

        {/* search  */}
        <SearchBar query={query} setQuery={setQuery} />

        {/* tabs  */}
        <ul className="flex items-center gap-1 border-b-2 border-primary dark:border-secondary">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                className={`px-5  py-3 rounded-t-md cursor-pointer  transition-all duraion-500 ${
                  activeTab === tab.id
                    ? "bg-white"
                    : "bg-primary dark:bg-secondary dark:text-white hover:bg-primary/50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* task list  */}
        {filterResults.length !== 0 && (
          <span>
            {filterResults.filter((result) => result.completed).length} /{" "}
            {filterResults.length} tasks completed
          </span>
        )}
        {tasks.length === 0 ? (
          <span className="capitalize text-center">no tasks yet</span>
        ) : filterResults.length === 0 ? (
          <span className="capitalize text-center">no results found</span>
        ) : (
          <TodoList tasks={filterResults} />
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}

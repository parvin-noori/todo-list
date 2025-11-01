import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTask } from "../features/tasks/taskSlice";

export default function NewTask(props) {
  const { tasks } = props;
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [priority, setpriority] = useState("medium");
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!task.trim()) {
      toast.error("please enter an input");
      return;
    }

    const isDuplicate = tasks.some(
      (t) => t.name.toLowerCase() === task.trim().toLowerCase()
    );

    if (isDuplicate) {
      toast.error("task already exist");
      return;
    }

    dispatch(
      addTask({
        id: Date.now(),
        name: task,
        completed: false,
        priority: priority,
      })
    );
    toast.success("task added successfuly");
    setTask("");
    setShowModal(false);
  }

  return (
    <>
      <button
        className="cursor-pointer bg-white rounded-md p-3"
        onClick={() => setShowModal(!showModal)}
      >
        <FiEdit />
      </button>

      {/* modal  */}
      <div
        ref={modalRef}
        className={`modal sm:w-md w-xs  z-20 bg-white dark:bg-secondary absolute top-10 sm:top-1/2 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 p-5 rounded-xl shadow-lg transition-all duration-300 ${
          showModal ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <form
          className="flex sm:flex-row flex-col item-center gap-2"
          onSubmit={handleSubmit}
        >
          <input
            value={task}
            ref={inputRef}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            className="border-2 border-secondary dark:border-white dark:bg-white outline-none p-2 rounded-md w-full"
            placeholder="New task..."
          />
          <select
            className="border-2 border-secondary dark:border-white dark:bg-white rounded-md outline-none sm:px-1 p-2"
            name=""
            id=""
            value={priority}
            onChange={(e) => setpriority(e.target.value)}
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <button
            type="submit"
            className="bg-secondary dark:bg-white hover:bg-secondary/90 hover:dark:bg-white/90 transition-all duration-200 text-white dark:text-black sm:px-3 p-2 rounded-md cursor-pointer"
          >
            save
          </button>
        </form>
      </div>

      {/* overlay  */}
      {showModal && <div className="bg-black/80 fixed inset-0 z-10"></div>}
    </>
  );
}

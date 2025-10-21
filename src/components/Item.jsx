import React, { useState, useRef, useEffect, useContext } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTasksContext } from "../contexts/TasksContext";

export default function Item(props) {
  const { task, tasks } = props;
  const { dispatch } = useTasksContext();
  const [name, setName] = useState(task.name);
  const [priority, setpriority] = useState(task.priority);
  const [editable, setEditable] = useState(false);
  const editInputRef = useRef(null);

  function handleDelete(taskId) {
    dispatch({ type: "REMOVE_TASK", payload: { id: taskId } });
  }

  function handleToggle(taskId) {
    dispatch({ type: "TOGGLE_TASK", payload: { id: taskId } });
  }

  function handleEdit(taskId) {
    const isDuplicate = tasks.some(
      (t) =>
        t.name.toLowerCase() === name.trim().toLowerCase() && taskId !== t.id
    );

    if (isDuplicate) {
      toast.error("task is already taken");
      return;
    }
    dispatch({
      type: "EDIT_TASK",
      payload: { id: taskId, name: name, priority: priority },
    });
    setEditable(false);
  }

  useEffect(() => {
    if (editable && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editable]);

  const priorityColors = {
    low: "bg-red-400",
    medium: "bg-yellow-400",
    high: "bg-green-400",
  };

  return (
    <div className="bg-white rounded-md p-3 flex items-center gap-x-3">
      {editable ? (
        <>
          <input
            type="text"
            className="border-2 border-primary dark:border-secondary outline-none p-1 rounded-md w-full"
            value={name}
            ref={editInputRef}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit(task.id);
              }
            }}
          />
          <select
            name=""
            id=""
            className="border-2 border-primary dark:border-secondary rounded-md outline-none p-1"
            value={priority}
            onChange={(e) => setpriority(e.target.value)}
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <button
            className="ms-auto cursor-pointer text-white px-4 py-1 rounded-md bg-primary dark:bg-secondary p-2 transition-all duration-100 hover:bg-secondary/90"
            onClick={() => handleEdit(task.id)}
          >
            save
          </button>
        </>
      ) : (
        <div className="flex items-center gap-x-2 w-full">
          <label
            htmlFor={task.id}
            className={`space-x-2 flex items-center gap-x-2 ${
              task.completed ? "line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              id={task.id}
              onChange={() => handleToggle(task.id)}
              checked={task.completed}
            />
            <span className="line-clamp-2 break-all">{task.name}</span>
          </label>
          <span
            className={`px-2  text-sm rounded-full ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
          <button
            className="ms-auto cursor-pointer p-2 text-white rounded-md border-2 border-transparent bg-primary dark:bg-secondary hover:bg-white hover:!text-primary hover:dark:!text-secondary hover:border-primary hover:dark:border-secondary transition-all duration-100"
            onClick={() => {
              setEditable(true);
            }}
          >
            <FiEdit />
          </button>
        </div>
      )}
      <button
        className="ms-auto cursor-pointer text-primary text-white p-2 rounded-md border border-transparent bg-primary dark:bg-secondary border-2 transition-all duration-100 hover:border-primary hover:dark:border-secondary hover:bg-white hover:!text-secondary"
        onClick={() => handleDelete(task.id)}
      >
        <FiTrash />
      </button>
    </div>
  );
}

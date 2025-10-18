import React, { useState, useRef, useEffect } from "react";

export default function Item(props) {
  const { task, dispatch } = props;
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
            className="border-2 border-primary outline-none p-1 rounded-md w-full"
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
            value={priority}
            onChange={(e) => setpriority(e.target.value)}
          >
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </select>
          <button
            className="ms-auto cursor-pointer text-white px-4 py-1 rounded-md bg-secondary p-2 transition-all duration-100 hover:bg-secondary/90"
            onClick={() => handleEdit(task.id)}
          >
            save
          </button>
        </>
      ) : (
        <>
          <label
            htmlFor={`task.id`}
            className={`grow space-x-2 flex items-center gap-x-2 ${
              task.completed ? "line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              id={`task.id`}
              onChange={() => handleToggle(task.id)}
              checked={task.completed}
            />
            {task.name}
            <span
              className={`px-2  text-sm rounded-full ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
          </label>
          <button
            className="ms-auto text-secondary cursor-pointer bg-white px-4 py-1 rounded-md border border-primary border-2 hover:bg-primary hover:text-white transition-all duration-100"
            onClick={() => {
              setEditable(true);
            }}
          >
            edit
          </button>
        </>
      )}
      <button
        className="ms-auto cursor-pointer text-white px-4 py-1 rounded-md border border-transparent bg-primary border-2 transition-all duration-100 hover:border-primary hover:bg-white hover:!text-secondary"
        onClick={() => handleDelete(task.id)}
      >
        delete
      </button>
    </div>
  );
}

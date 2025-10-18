import React from "react";
import Item from "./Item";

export default function TodoList({ tasks, dispatch }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id}>
          <Item task={task} dispatch={dispatch} />
        </li>
      ))}
    </ul>
  );
}

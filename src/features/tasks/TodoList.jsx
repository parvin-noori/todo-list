import Item from "../../components/Item";

export default function TodoList({ tasks }) {
  return (
    <ul className="space-y-3 md:h-92 h-svh overflow-y-scroll">
      {tasks.map((task) => (
        <li key={task.id}>
          <Item task={task} tasks={tasks} />
        </li>
      ))}
    </ul>
  );
}

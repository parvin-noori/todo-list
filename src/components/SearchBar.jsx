import { FiSearch } from "react-icons/fi";

export default function SearchBar(props) {
  const { query, setQuery } = props;
  return (
    <form className="bg-white rounded-md overflow-hidden flex w-full">
      <input
        type="text"
        placeholder="search task..."
        className="bg-transparent p-2 outline-none indent-2 grow flex"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button type="button" className="px-3 bg-secondary text-white cursor-pointer">
        <FiSearch />
      </button>
    </form>
  );
}

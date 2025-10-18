import React from "react";

export default function SearchBar(props) {
  const { query, setQuery } = props;
  return (
  
      <form className="bg-white rounded-lg overflow-hidden">
        <input
          type="text"
          className="bg-transparent p-2 outline-none indent-2"
            value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <input
          type="submit"
          placeholder="search"
        
          className="p-2 bg-secondary text-white cursor-pointer"
        />
      </form>
    
  );
}

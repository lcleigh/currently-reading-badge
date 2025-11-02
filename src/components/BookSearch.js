import React, { useState } from "react";

export default function BookSearch({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search for a book..."
      />
      <button onClick={handleSearch}>
        🔍 Search
      </button>
    </div>
  );
}
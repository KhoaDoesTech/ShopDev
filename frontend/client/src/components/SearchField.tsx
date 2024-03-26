/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SearchFieldProps {
  placeholder?: string;
  data: any[];
}

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = "Search...",
  data,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]); // List of suggestions
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);

    // Logic to generate suggestions (for demo, it's a static list)
    const titleList = data.map((item) => item.product_name);
    const filteredSuggestions = titleList.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchValue(value);
    const product = data.filter((item) => item.product_name === value);
    navigate(`/product/${product[0]?.product_slug}`);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

  return (
    <div className="relative w-[50vw]">
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden  px-1">
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          className="w-full px-4 py-2 focus:outline-none bg-transparent"
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 outline-none border-none"
        >
          <FaSearch />
        </button>
      </div>
      {suggestions.length > 0 && searchValue !== "" && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 py-1">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchField;

import React, { useState } from 'react';

const Dropdown = ({ options, selectedValue, onSelect, customStyles }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${customStyles}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-2 px-4 bg-white border rounded shadow-md focus:outline-none focus:border-blue-500"
      >
        {selectedValue}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 bg-white border rounded shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="py-2 px-4 hover:bg-blue-500 hover:text-white cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

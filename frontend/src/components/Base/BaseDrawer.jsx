import React from "react";

const Drawer = ({ isOpen, position, size, onClose, title, children }) => {
  const getPositionClass = () => {
    switch (position) {
      case "left":
        return "left-0 h-full top-0";
      case "right":
        return "right-0 h-full top-0";
      case "top":
        return "top-0 w-full left-0";
      case "bottom":
        return "bottom-0 w-full left-0";
      default:
        return "left-0 h-full top-0";
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-full sm:w-1/4"; // Set full width on small screens
      case "medium":
        return "w-full sm:w-1/2"; // Set full width on small screens
      case "large":
        return "w-full sm:w-3/4"; // Set full width on small screens
      default:
        return "w-full sm:w-1/2"; // Set full width on small screens
    }
  };

  return (
    <div
      className={`fixed ${getPositionClass()} ${getSizeClass()} bg-white shadow-md transition-transform transform duration-300 ${
        isOpen
          ? "translate-x-0"
          : position === "left"
            ? "-translate-x-full"
            : "translate-x-full"
      } z-50`}
      style={{ zIndex: 9999 }} // Set a high z-index value
    >
      <div className="flex justify-between p-4 sm:border-b">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-600">
          Close
        </button>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Drawer;

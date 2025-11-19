import React, { useState, useEffect, useRef } from "react";
import UpdateAssetModal from "./UpdateAssetModal";
import DeleteAssetModal from "./DeleteAssetModal";

const Dropdown = (props) => {
  const { item } = props;
  const [isOpen, setIsOpen] = useState(false);
  // 1. Create a reference to the dropdown container
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleEdit = () => {
    console.log("Edit action triggered");
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
    setIsOpen(false);
  };

  // 2. Implement the useEffect hook for click-outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the menu is open AND the click is NOT inside the dropdown container, close it.
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener to the entire document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // Rerun if the ref changes (optional, but good practice)

  return (
    // 3. Attach the ref to the outermost container
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* 1. Trigger Button */}
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex items-center justify-center h-10 w-10 rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="More actions"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>

      {/* 2. Dropdown Menu Panel */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {/* Edit Option */}
            <UpdateAssetModal item={item} />

            {/* Delete Option */}
            <DeleteAssetModal item={item} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

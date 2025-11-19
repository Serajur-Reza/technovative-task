"use client";

import React, { useEffect, useRef } from "react";

const ViewAssetModal = ({ isOpen, setIsOpen, item }) => {
  const modalRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  // Logic to close modal by clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null; // Don't render anything if it's not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-xl font-bold text-indigo-600">
            Id - {item?.["@id"]}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="py-4 text-gray-700 space-y-3">
          <div>
            <p className="text-xl">Edc - {item?.["@context"]?.edc}</p>
            <p>BaseUrl - {item?.dataAddress?.baseUrl}</p>
            <p>Type - {item?.["@type"]}</p>
            <p>@vocab: {item?.["@context"]?.["@vocab"]}</p>
            <p>DataAddress Type: {item?.dataAddress?.type}</p>
            <p className="text-sm">
              Description - {item?.properties?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAssetModal;

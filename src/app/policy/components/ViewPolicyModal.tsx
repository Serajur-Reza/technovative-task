"use client";

import React, { useEffect, useRef } from "react";

const ViewPolicyModal = ({ isOpen, setIsOpen, item }) => {
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
          {/* <p className="text-xl">Id - {item?.["@id"]}</p> */}

          <p>vocab - {item?.["@context"]?.["@vocab"]}</p>
          <p>Policy Context - {item?.policy?.["@context"]}</p>
          <p>Policy Type - {item?.policy?.["@type"]}</p>
          <p>Target - {item?.policy?.permission[0]?.target}</p>
          <p>Action - {item?.policy?.permission[0]?.action}</p>

          <p>
            LeftOperand -{" "}
            {item?.policy?.permission[0]?.constraint[0]?.leftOperand}
          </p>
          <p>
            Operator - {item?.policy?.permission[0]?.constraint[0]?.operator}
          </p>
          <p>
            RightOperand -{" "}
            {item?.policy?.permission[0]?.constraint[0]?.rightOperand}
          </p>
          <p>Comment - {item?.policy?.permission[0]?.constraint[0]?.comment}</p>

          <p className="text-sm">Type - {item?.policy?.["@type"]}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPolicyModal;

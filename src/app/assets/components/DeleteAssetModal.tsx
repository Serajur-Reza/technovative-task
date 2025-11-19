import api from "@/utils/axios";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

// Custom Hook or component to manage the Confirmation Modal logic
const DeleteAssetModal = (props) => {
  const { item } = props;
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // --- Click Outside & Escape Key Logic ---
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
  }, [isOpen]);
  // --- End Logic ---

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/assets/${item?.["@id"]}`);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      closeModal();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      {/* Example Button to Open the Modal */}
      <button
        onClick={openModal}
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
      >
        Delete
      </button>

      {/* The Modal Overlay */}
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity"
        >
          {/* Modal Content Box */}
          <div
            ref={modalRef} // Attach ref for click-outside check
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-auto transform transition-all"
          >
            <div className="p-6 text-center">
              {/* Warning Icon (Red Circle) */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.332 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>

              {/* Title and Message */}
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Delete Asset
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to delete this asset?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 rounded-b-xl">
              <button
                type="button"
                onClick={handleDelete}
                // Destructive button is colored red
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm transition duration-150"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 sm:mt-0 sm:w-auto sm:text-sm transition duration-150"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAssetModal;

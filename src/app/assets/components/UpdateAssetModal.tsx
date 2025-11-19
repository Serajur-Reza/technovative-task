"use client";

import api from "@/utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateAssetModal = (props) => {
  const { item } = props;
  // State to control the visibility of the modal
  const [isOpen, setIsOpen] = useState(false);

  // State to hold the form data
  const [formData, setFormData] = useState({
    id: item?.["@id"] || "",
    name: "",
    description: item?.properties?.description || "",
    assetType: item?.["@type"] || "text", // Default content type
  });

  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setFormData({ id: "", name: "", description: "", assetType: "text" });
    setIsOpen(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const obj = {
        "@context": {
          "@vocab": item?.["@context"]?.["@vocab"],
        },
        "@id": formData?.id,
        properties: {
          description: formData?.description,
          id: formData?.id,
        },

        dataAddress: {
          type: formData.assetType,
          baseUrl: item?.dataAddress?.baseUrl,
        },
      };

      const response = await api.put(`/assets`, obj);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      closeModal();
      setFormData({ id: "", name: "", description: "", assetType: "text" });
    }

    // Optional: Reset form data here
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 ">
      {/* The Trigger Button */}
      <button
        onClick={openModal}
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
      >
        Update
      </button>

      {/* The Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
          {/* Modal Content Box */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                Asset Details
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

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="py-6 space-y-4">
              {/* Field 1: ID */}
              <div>
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  ID (Read-Only/System)
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="e.g., Asset-123"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-gray-50"
                />
              </div>

              {/* Field 2: Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Product Feature Launch"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              {/* Field 3: Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Briefly summarize the purpose of this Asset..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                ></textarea>
              </div>

              {/* Field 4: Content Type */}
              <div>
                <label
                  htmlFor="assetType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asset Type
                </label>
                <select
                  name="assetType"
                  id="assetType"
                  value={formData.assetType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                >
                  <option value="text">Text Document</option>
                  <option value="video">Video/Media</option>
                  <option value="image">Image Gallery</option>
                  <option value="data">Data Feed</option>
                </select>
              </div>

              {/* Modal Footer / Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAssetModal;

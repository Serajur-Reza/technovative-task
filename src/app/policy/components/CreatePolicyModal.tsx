"use client";

import api from "@/utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreatePolicyModal = () => {
  // State to control the visibility of the modal
  const [isOpen, setIsOpen] = useState(false);

  // State to hold the form data
  const [formData, setFormData] = useState({
    edc: "",
    odrl: "",
    id: "",
    type: "",
    target: "",
    policyContext: "",
    policyType: "",
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
    setFormData({
      edc: "",
      odrl: "",
      id: "",
      type: "",
      target: "",
      policyContext: "",
      policyType: "",
    });
    setIsOpen(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const obj = {
        "@context": {
          edc: formData?.edc,
          odrl: formData?.edc,
        },
        "@type": formData?.type,
        "@id": formData?.id,
        policy: {
          "@context": formData?.policyContext,
          "@type": formData?.policyType,
        },
      };

      const response = await api.post(`/policydefinitions`, obj);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      closeModal();
      setFormData({
        edc: "",
        odrl: "",
        id: "",
        type: "",
        target: "",
        policyContext: "",
        policyType: "",
      });
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
        Create Policy
      </button>

      {/* The Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity">
          {/* Modal Content Box */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                Policy Details
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
                  placeholder="e.g., Policy-123"
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
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g., Product Feature Launch"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Edc
                </label>
                <input
                  type="text"
                  name="edc"
                  id="edc"
                  value={formData.edc}
                  onChange={handleChange}
                  placeholder="e.g., Product Feature Launch"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Odrl
                </label>
                <input
                  type="text"
                  name="odrl"
                  id="odrl"
                  value={formData.odrl}
                  onChange={handleChange}
                  placeholder="e.g., Product Feature Launch"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label
                  htmlFor="assetType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Policy Context
                </label>
                <input
                  type="text"
                  name="policyContext"
                  id="policyContext"
                  value={formData.policyContext}
                  onChange={handleChange}
                  placeholder="e.g., Product Feature Launch"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>

              <div>
                <label
                  htmlFor="assetType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Policy Type
                </label>
                <input
                  type="text"
                  name="policyType"
                  id="policyType"
                  value={formData.policyType}
                  onChange={handleChange}
                  placeholder="e.g., Product Feature Launch"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
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
                  Save Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePolicyModal;

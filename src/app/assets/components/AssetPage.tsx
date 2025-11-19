"use client";

import React, { useEffect, useState } from "react";

import api from "@/utils/axios";
import CreateAssetModal from "./CreateAssetModal";
import axios from "axios";
import { baseUrl } from "@/constants/url";
import { toast } from "react-toastify";
import Dropdown from "./Dropdown";
import ViewAssetModal from "./ViewAssetModal";

const data = [
  {
    "@id": "1",
    "@type": "Asset",
    properties: {
      description: "description",
      id: "1",
    },
    dataAddress: {
      "@type": "DataAddress",
      type: "HttpData",
      baseUrl: "https://www.google.com/",
    },
    "@context": {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
      edc: "https://w3id.org/edc/v0.0.1/ns/",
      odrl: "http://www.w3.org/ns/odrl/2/",
    },
  },

  {
    "@id": "2",
    "@type": "Asset",
    properties: {
      description: "description",
      id: "1",
    },
    dataAddress: {
      "@type": "DataAddress",
      type: "HttpData",
      baseUrl: "https://www.google.com/",
    },
    "@context": {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
      edc: "https://w3id.org/edc/v0.0.1/ns/",
      odrl: "http://www.w3.org/ns/odrl/2/",
    },
  },
];

const AssetPage = () => {
  const [asset, setAssets] = useState([]);

  const [openViewAssetModal, setOpenViewAssetModal] = useState(false);

  const [singleAsset, setSingleAsset] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(`/assets/request/`);
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    fetchData();
  }, [asset]);

  const openViewAssetModalHandler = (item) => {
    setOpenViewAssetModal(true);
    setSingleAsset(item);
  };

  return (
    <div>
      <CreateAssetModal />
      {data?.map((item) => (
        <div
          key={item?.["@id"]}
          className="bg-gray-200  border-2 border-amber-50 p-4 m-4 rounded-lg flex justify-between cursor-pointer"
        >
          <div onClick={() => openViewAssetModalHandler(item)}>
            <p className="text-xl">Edc - {item?.["@context"]?.edc}</p>
            <p>BaseUrl - {item?.dataAddress?.baseUrl}</p>
            <p>Type - {item?.["@type"]}</p>
            <p className="text-sm">
              Description - {item?.properties?.description}
            </p>
          </div>

          <div>
            <Dropdown item={item} />
          </div>
        </div>
      ))}

      <ViewAssetModal
        isOpen={openViewAssetModal}
        setIsOpen={setOpenViewAssetModal}
        item={singleAsset}
      />
    </div>
  );
};

export default AssetPage;

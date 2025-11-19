"use client";

import React, { useEffect, useState } from "react";

import api from "@/utils/axios";
// import CreateAssetModal from "./CreateAssetModal";
import axios from "axios";
import { baseUrl } from "@/constants/url";
import { toast } from "react-toastify";
import ViewPolicyModal from "./ViewPolicyModal";
import CreatePolicyModal from "./CreatePolicyModal";

const data = [
  {
    "@context": {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
    },
    "@id": "definition-id",
    policy: {
      "@context": "http://www.w3.org/ns/odrl.jsonld",
      "@type": "Set",
      uid: "http://example.com/policy:1010",
      permission: [
        {
          target: "http://example.com/asset:9898.movie",
          action: "display",
          constraint: [
            {
              leftOperand: "spatial",
              operator: "eq",
              rightOperand: "https://www.wikidata.org/wiki/Q183",
              comment: "i.e Germany",
            },
          ],
        },
      ],
    },
    createdAt: 1688465655,
  },
];

const PolicyPage = () => {
  const [policies, setPolicies] = useState([]);

  const [openViewPolicyModal, setOpenViewPolicyModal] = useState(false);

  const [singlePolicy, setSinglePolicy] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.post(`/policydefinitions/request`);

        // const res = await fetch(`${baseUrl}/assets/request`, {
        //   method: "POST",
        //   headers: {
        //     "x-api-key": "SomeOtherApiKey",
        //   },
        // });
      } catch (error) {
        toast.error(error?.message || "Something went wrong");
      }
    };

    fetchData();
  }, [policies]);

  const openViewPolicyModalHandler = (item) => {
    setOpenViewPolicyModal(true);
    setSinglePolicy(item);
  };

  return (
    <div>
      <CreatePolicyModal />
      {data?.map((item) => (
        <div
          key={item?.["@id"]}
          className="bg-gray-200  border-2 border-amber-50 p-4 m-4 rounded-lg flex justify-between"
        >
          <div
            className="cursor-pointer"
            onClick={() => openViewPolicyModalHandler(item)}
          >
            <p className="text-xl">Id - {item?.["@id"]}</p>

            <p>vocab - {item?.["@context"]?.["@vocab"]}</p>
            <p className="text-sm">Type - {item?.policy?.["@type"]}</p>
          </div>

          {/* <div>
            <Dropdown />
          </div> */}
        </div>
      ))}

      <ViewPolicyModal
        isOpen={openViewPolicyModal}
        setIsOpen={setOpenViewPolicyModal}
        item={singlePolicy}
      />
    </div>
  );
};

export default PolicyPage;

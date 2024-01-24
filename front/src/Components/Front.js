import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { makeUnAuthenticatedGETRequest } from "../utils/ServerHelper";
import CuisinesCard from "./CuisinesCard";
import { Link, useNavigate } from "react-router-dom";

const Front = ({onClick} ) => {
  //useState
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeUnAuthenticatedGETRequest(
          "/Category/getCategory"
        );
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching all Categories: ", error.message);
      }
    };

    getData();
  }, [categoryData]);

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {Array.isArray(categoryData) &&
          categoryData.map((item) => (
            <CuisinesCard
              key={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              className="border mb-4 h-1/2 text-black cursor-pointer transition-color duration-500 border-yellow-500 p-2 bg-yellow-500 border-2 text-black hover:bg-black hover:text-yellow-500 hover:scale-105 transition-transform"
              onClick={onClick}
            />
          ))}
      </div>
    </div>
  );
};
export default Front;

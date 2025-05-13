import React from "react";
import campusMap from "../assets/campus_map.webp"; // Update the path accordingly

const CampusMap = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Campus Map</h2>
      <img src={campusMap} alt="Campus Map" className="w-full max-w-4xl rounded-lg shadow-lg" />
    </div>
  );
};

export default CampusMap;


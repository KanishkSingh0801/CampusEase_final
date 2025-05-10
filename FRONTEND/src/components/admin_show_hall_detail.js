import { useState, useEffect } from "react";
import axios from "axios";
// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function AdminShowHallDetail({ selectedHall }) {
  // console.log("hello");
  
  const [isEditing, setIsEditing] = useState(false);
  // const [hallData, setHallData] = useState({ ...selectedHall });
  // console.log(hallData);
  const [hallData, setHallData] = useState({});

  useEffect(() => {
    setHallData({ ...selectedHall });
    // console.log("Selected hall updated:", selectedHall);
  }, [selectedHall]);
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setHallData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/api/halls/updateHall/${hallData._id}`, hallData); // adjust endpoint
      // await axios.put(`http://localhost:3001/api/halls/updateHall/${hallData._id}`, hallData); // adjust endpoint
      // await axios.put(`https://campusease-final.onrender.com/api/halls/updateHall/${hallData._id}`, hallData); // adjust endpoint
      setIsEditing(false);
      alert("Hall updated successfully");
    } catch (error) {
      console.error("Error updating hall:", error);
      alert("Failed to update hall");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          {isEditing ? (
            <input
              type="text"
              name="Hall_Name"
              value={hallData.Hall_Name}
              onChange={handleChange}
              className="text-center border-b-2 border-blue-300 focus:outline-none w-full"
            />
          ) : (
            hallData.Hall_Name
          )}
        </h1>

        {/* Images */}
        <div className="flex overflow-x-auto gap-4 mb-6 scroll-smooth">
          <img
            src={hallData.Image1}
            className="flex-shrink-0 w-full sm:w-[500px] h-72 object-cover rounded-lg shadow-md"
            alt="Hall Image 1"
          />
          <img
            src={hallData.Image2}
            className="flex-shrink-0 w-full sm:w-[500px] h-72 object-cover rounded-lg shadow-md"
            alt="Hall Image 2"
          />
        </div>

        {isEditing && (
          <div className="mb-6 flex flex-col gap-4">
            <input
              type="url"
              name="Image1"
              value={hallData.Image1}
              onChange={handleChange}
              placeholder="Image 1 URL"
              className="p-2 border rounded"
            />
            <input
              type="url"
              name="Image2"
              value={hallData.Image2}
              onChange={handleChange}
              placeholder="Image 2 URL"
              className="p-2 border rounded"
            />
          </div>
        )}

        {/* Hall Details */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            About this Hall
          </h2>

          <div className="mb-4">
            <label className="font-medium">Description:</label>
            {isEditing ? (
              <textarea
                name="Description"
                value={hallData.Description}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            ) : (
              <p className="text-lg text-gray-700">{hallData.Description}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="font-medium">Capacity:</label>
            {isEditing ? (
              <input
                type="number"
                name="Capacity"
                value={hallData.Capacity}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            ) : (
              <p className="text-lg text-gray-800 font-semibold">
                {hallData.Capacity} people
              </p>
            )}
          </div>

          <div className="mt-3 p-3 bg-gray-100 rounded-xl shadow-inner">
            <label className="font-medium">Maintenance Cost (₹/hr):</label>
            {isEditing ? (
              <input
                type="number"
                name="Price"
                value={hallData.Price}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            ) : (
              <p className="text-lg text-gray-600">
                ₹{hallData.Price}/hr
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="w-40 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="w-40 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-40 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminShowHallDetail;


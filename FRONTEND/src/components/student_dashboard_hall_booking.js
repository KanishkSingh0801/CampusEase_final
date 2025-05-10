import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import StudentHallBookingNavbar from "./student_dashboard_navbar";
import StudentHallBookingDetailsPage from "./student_dashboard_hall_details";
import StudentHallBookingBookingForm from "./student_dashboard_booking_form";

// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function StudentDashboardHallBookingHallList() {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedHall, setSelectedHall] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [list, setList] = useState(["Hall Booking"]);
  const detailsRef = useRef(null);

  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/api/halls/getAllHalls")
    // axios
    //   .get("https://campusease-final.onrender.com/api/halls/getAllHalls")
    axios
      .get(`${BASE_URL}/api/halls/getAllHalls`)
      .then((response) => setHalls(response.data))
      .catch((error) => console.error("Error fetching hall data:", error));
  }, [selectedCapacity]); //  Refetch when capacity changes

  const handleBreadcrumbClick = (updatedList) => {
    setList(updatedList);
  };

  const loadDetailsPage = (hall) => {
    if (!hall) return; //  Prevents null errors
    setShowDetails(true);
    setShowBookingForm(false);
    setSelectedHall(hall);
    setList(["Hall Booking", hall.Hall_Name]); //  Replaces instead of appending
    setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const loadBookingForm = (hall) => {
    if (!hall) return; //  Prevents null errors
    setShowDetails(false);
    setShowBookingForm(true);
    setSelectedHall(hall);
    setList(["Resource Booking", hall.Hall_Name, "Book hall"]); //  Replaces instead of appending
    setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  return (
    <div>
    <div className="min-h-screen bg-gray-100">
      {/* Navbar with breadcrumb handling */}
      <StudentHallBookingNavbar listAdd={list} childToParent={handleBreadcrumbClick} />

      <div className="container mx-auto p-5">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Facilities</h2>

        {/* Filter Dropdown */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Capacity:</label>
          <select
            onChange={(e) => setSelectedCapacity(e.target.value)}
            className="mt-1 p-2 w-full md:w-1/3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="">Any Capacity</option>
            <option value="50">50+ Seats</option>
            <option value="100">100+ Seats</option>
            <option value="200">200+ Seats</option>
            <option value="500">500+ Seats</option>
          </select>
        </div>

        {/* Halls List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {halls
            .filter((hall) => !selectedCapacity || hall.Capacity >= parseInt(selectedCapacity))
            .map((hall) => (
              <div key={hall._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img src={hall.Image1} alt={hall.Hall_Name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-lg font-semibold">{hall.Hall_Name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <button
                      onClick={() => loadDetailsPage(hall)}
                      className="w-1/2 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-bl-lg"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        const token = localStorage.getItem("authToken");
                        if (!token) {
                          navigate("/login");
                          return;
                        }
                        loadBookingForm(hall);
                      }}
                      className="w-1/2 py-2 text-sm font-medium text-white bg-blue-500 rounded-br-lg"
                    >
                      Book Hall
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Details and Booking Form Section */}
      
    </div>
      <div ref={detailsRef} className="mt-10 container mx-auto">
        {showDetails && <StudentHallBookingDetailsPage selectedHall={selectedHall} />}
        {showBookingForm && <StudentHallBookingBookingForm selectedHall={selectedHall} />}
      </div>
    </div>
  );
}

export default StudentDashboardHallBookingHallList;

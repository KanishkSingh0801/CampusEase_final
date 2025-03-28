import sgsits from "../assets/sgsits.jpeg";
import StudentHallBookingDetailsPage from "./student_dashboard_hall_details";
import StudentHallBookingNavbar from "./student_dashboard_navbar";
import StudentHallBookingBookingForm from "./student_dashboard_booking_form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentDashboardHallBookingHallList() {
  //GET HALLS FROM halls SCHEMA FROM MONGO
  const navigate = useNavigate();
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:3001/api/halls/getAllHalls")
      .then((response) => {
        setHalls(response.data);
        // console.log("Hall data fetcjed");
        
        // console.log(response.data);

      })
      .catch((error) => {
        console.error("Error fetching hall data:", error);
      });
  }, []);
  ///
 
  
  // Handling filter by capacity 
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const handleCapacityChange = (e) => {
    setSelectedCapacity(e.target.value);
  };
  const filteredHalls = selectedCapacity
  ? halls.filter((hall) => hall.Capacity >= parseInt(selectedCapacity))
  : halls;
  

  //HANDLING SELECTED HALL
  const [selectedHall, setSelectedHall] = useState("");
  ///

  var [show, showDetails] = useState(false);
  var [showBF, showBookingForm] = useState(false);

  var hall_name = "Vivekanandha Auditorium";
  var hall_list = ["Hall Booking"];

  var [list, listAdd] = useState(hall_list);

  const loadDetailsPage = (hall) => {
    showDetails((show) => !show);
    hall_list.push(hall.Hall_Name);
    listAdd(hall_list);
    setSelectedHall(hall);
    console.log(`hall list (loaddetailspage) ${hall_list}`);
    console.log(`list (loaddetailspage) ${list}`);
    
  };

  const loadBookingForm = (hall) => {
    showBookingForm((showBF) => !showBF);
    hall_list.push(hall.Hall_Name); //
    hall_list.push("Book hall");
    listAdd(hall_list);
    setSelectedHall(hall); 
    console.log(`hall list (loadbookingform) ${hall_list}`);
    console.log(`list (loaddetailspage) ${list}`);
  };

  const childToParent = (childData) => {
    if (childData[0].length === 2) {
      showDetails(false);
    } else if (childData[0].length === 3) {
      if (childData[1] === "Hall Booking") {
        showBookingForm(false);
        showDetails(false);

        childData[0].pop();
      } else {
        showBookingForm(false);
        showDetails(true);
      }
    }

    childData[0].pop();
    listAdd(childData[0]);
  };

  return (
    <div className="w-full">
      {
        <StudentHallBookingNavbar
          listAdd={list}
          childToParent={childToParent}
        />
      }
      {!show && !showBF && (
        <div className="p-5 md:p-10 bg-zinc-100">
          {/* <div className="text-3xl font-semibold text-green-700 mb-5"> */}
          <div className="mb-4 text-md md:text-2xl font-bold whitespace-nowrap">
            HALL DETAILS
          </div>
          <div className="flex justify-between flex-wrap">
            {/* <div className="flex items-center w-full mb-3 md:w-1/2">
              <div className="whitespace-nowrap text-gray-900 font-semibold">
                Department :{" "}
              </div>
              <select
                id="Departments"
                onChange={handleDepartmentChange}
                defaultValue="All Departments"
                className="bg-zinc-200 text-gray-500 w-full ml-3 md:mx-3 text-md rounded-lg p-1.5"
              >
                <option value="">All Departments</option>
                <option value="Mathematics">Department of Mathematics</option>
                <option value="Dean's Office">Office of Dean</option>
              </select>
            </div> */}

            <div className="flex items-center w-full mb-3 md:w-1/2">
              <div className="whitespace-nowrap text-gray-900 font-semibold">
                Capacity:{" "}
              </div>
              <select
                id="Capacity"
                onChange={handleCapacityChange}
                defaultValue="Any Capacity"
                className="bg-zinc-200 text-gray-500 w-full ml-3 md:mx-3 text-md rounded-lg p-1.5"
              >
                <option value="">Any Capacity</option>
                <option value="50">50+ Seats</option>
                <option value="100">100+ Seats</option>
                <option value="200">200+ Seats</option>
                <option value="500">500+ Seats</option>
              </select>
            </div>
 

            {/* <div className=" w-full md:w-1/2">
              <input
                type="text"
                id="first_name"
                className="bg-zinc-200 w-full text-gray-500 border-gray-300 text-md rounded-lg p-1.5"
                placeholder="Search"
              />
            </div> */}
          </div>

          <div className="-mx-3 flex flex-wrap">
            {filteredHalls.map((hall) => (
              <div key={hall._id} className="w-full md:w-1/2 lg:w-1/3 p-3">
                <div className="relative bg-white rounded-lg shadow-2xl">
                  <div className="p-5 absolute z-10 w-full top-0 bg-gray-950/75 h-36 flex justify-center items-center rounded-t-lg text-center">
                    <div>
                      <h5 className="mb-2 text-2xl font-semibold text-white">
                        {hall.Hall_Name}
                      </h5>
                    </div>
                  </div>
                  <div>
                    <img
                      className="h-36 w-full rounded-t-lg"
                      src={hall.Image1}
                      alt={hall.Hall_Name}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => loadDetailsPage(hall)}
                      className="text-center w-1/2 px-3 py-2 h-10 text-sm font-medium text-black bg-zinc-300 rounded-bl-lg hover:bg-zinc-400"
                    >
                      View details
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const token = localStorage.getItem("authToken");
                        if (!token) navigate("/login");
                        else loadBookingForm(hall);
                      }}
                      className="text-center w-1/2 px-3 py-2 h-10 text-sm font-medium text-white bg-sky-500 rounded-br-lg hover:bg-sky-600"
                    >
                      Book hall
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {show && <StudentHallBookingDetailsPage selectedHall={selectedHall} />}
      {
        showBF && <StudentHallBookingBookingForm selectedHall={selectedHall} /> //
      }
    </div>
  );
}

export default StudentDashboardHallBookingHallList;

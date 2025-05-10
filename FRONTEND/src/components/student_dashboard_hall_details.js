import { useNavigate } from "react-router-dom";
import StudentHallBookingBookingForm from "./student_dashboard_booking_form";
import { useState , useEffect} from "react";

function StudentHallBookingDetailsPage({ selectedHall }) {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(false);

   
  const [userType, setUserType] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(selectedHall.Price);

  const getDiscountedPrice = (price, userType) => {
    let discount = 0;
    switch (userType) {
      case "student":
        discount = 0.7;
        break;
      case "faculty":
        discount = 0.4;
        break;
      default:
        discount = 0;
    }
    return Math.round(price * (1 - discount));
  };
  

  useEffect(() => {
    const tokenString = localStorage.getItem("authToken");
    if (tokenString) {
      try {
        const tokenObject = JSON.parse(tokenString); // Convert string to object
        const role = tokenObject.userType; // Extract userType (e.g., "student", "faculty")
        setUserType(role);
  
        const discounted = getDiscountedPrice(selectedHall.Price, role);
        setDiscountedPrice(discounted);
      } catch (error) {
        console.error("Error parsing authToken:", error);
        setUserType(null);
        setDiscountedPrice(selectedHall.Price);
      }
    } else {
      setUserType(null);
      setDiscountedPrice(selectedHall.Price);
    }
  }, [selectedHall.Price]);
  

  return (
    <>
      {booking ? (
        <StudentHallBookingBookingForm selectedHall={selectedHall} />
      ) : (
        <div className="p-10 bg-gray-100 min-h-screen flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
            {/* Hall Title */}
            <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
              {selectedHall.Hall_Name}
            </h1>

            {/* Hall Images */}
            {/* <div className="grid grid-cols-2 gap-4 mb-6">
              <img
                src={selectedHall.Image1}
                className="w-full h-72 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
                alt="Hall Image 1"
              />
              <img
                src={selectedHall.Image2}
                className="w-full h-72 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
                alt="Hall Image 2"
              />
            </div> */}
            <div className="flex overflow-x-auto gap-4 mb-6 scroll-smooth">
  <img
    src={selectedHall.Image1}
    className="flex-shrink-0 w-full sm:w-[500px] h-72 object-cover rounded-lg shadow-md"
    alt="Hall Image 1"
  />
  <img
    src={selectedHall.Image2}
    className="flex-shrink-0 w-full sm:w-[500px] h-72 object-cover rounded-lg shadow-md"
    alt="Hall Image 2"
  />
</div>


            {/* Hall Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                About this Hall
              </h2>
              <p className="text-lg text-gray-700">
                <b>Description: </b> {selectedHall.Description}
              </p>
              {/* <p className="text-xl font-semibold text-green-700 mt-3">
                Price: ₹{selectedHall.Price}/hr
              </p> */}
              
              {/* <p className="text-xl font-semibold text-green-700 mt-3">
  Price: ₹{selectedHall.Price}/hr
</p>
{discountedPrice !== selectedHall.Price && (
  <p className="text-xl font-semibold text-red-500 mt-1">
    Discounted Price: ₹{discountedPrice}/hr
  </p>
)} */}
{/* <div className="mt-4">
  <p className="text-xl font-semibold text-gray-800">
    Capacity: {selectedHall.Capacity} people
  </p> */}

  {/* <div className="mt-3 p-4 bg-blue-50 rounded-xl shadow-inner flex flex-col gap-1">
    <div className="text-lg text-gray-600 line-through">
      Original Price: ₹{selectedHall.Price}/hr
    </div>
    <div className="text-2xl font-bold text-blue-700">
      You Pay: ₹{discountedPrice}/hr
    </div>
    <div className="text-sm text-green-600 font-medium">
      {userType === "student" && "Student discount applied (70%)"}
      {userType === "faculty" && "Faculty discount applied (40%)"}
    </div>
  </div> */}
{/* </div> */}



              <p className="text-lg font-semibold text-gray-800">
                Capacity: {selectedHall.Capacity} people
              </p>
              {/* <div className="mt-3 p-4 bg-blue-50 rounded-xl shadow-inner flex flex-col gap-1">
    <div className="text-lg text-gray-600 line-through">
      Original Price: ₹{selectedHall.Price}/hr
    </div>
    <div className="text-2xl font-bold text-blue-700">
      You Pay: ₹{discountedPrice}/hr
    </div>
    <div className="text-sm text-green-600 font-medium">
      {userType === "student" && "Student discount applied (70%)"}
      {userType === "faculty" && "Faculty discount applied (40%)"}
    </div>
  </div> */}
<div className="mt-3 p-3 bg-gray-100 rounded-xl shadow-inner flex flex-col gap-1">
  <div className="text-lg text-gray-600 line-through">
    Original Price: ₹{selectedHall.Price}/hr
  </div>
  <div className="text-2xl font-bold text-blue-700">
    You Pay: ₹{discountedPrice}/hr
  </div>
  <div className="text-sm text-green-600 font-medium">
    {userType === "student" && "Student discount applied (70%)"}
    {userType === "faculty" && "Faculty discount applied (40%)"}
  </div>
</div>


              
            </div>

            {/* Book Now Button */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="w-40 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("authToken");
                  if (!token) navigate("/login");
                  setBooking(true);
                }}
              >
                📅 Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentHallBookingDetailsPage;

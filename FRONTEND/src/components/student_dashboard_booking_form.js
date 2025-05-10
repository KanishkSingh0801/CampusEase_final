// import Datepicker from "tailwind-datepicker-react";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupModal from "./popup_modal";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


function StudentDashboardHallBookingBookingForm({ selectedHall }) {
  //GET HALLS FROM halls SCHEMA FROM MONGO
  const [name, setName] = useState("");
  const [halls, setHalls] = useState([]);
  const [affiliatedDept, setAffiliatedDept] = useState("");
  const [Time_From, setTimeFrom] = useState("");
  const [Time_To, setTimeTo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const [bookingPersonName, setBookingPersonName] = useState("");  //change
  const [userType, setUserType] = useState(""); //change
  const [id, setId] = useState("");
  const [isVerified, setIsVerified] = useState(false); //change
  const [verifying, setVerifying] = useState(false); //change
  
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price

  const [proposalPDF, setProposalPDF] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);
  //
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Add this line
  const navigate = useNavigate();


  //STUDENT ODA DEPARTMENT
  
  
  const handleVerification = async () => {
    
    // if(userType==="visitor"){
    //   setIsVerified(true);
    //   return;
    // }
    if (userType === "visitor") {
      setIsVerified(true);
      // setVerificationMsg("Visitor verified (no ID needed)");
      return;
    }
    // if (!userType || !id) {
    //     alert("Please select a user type and enter the ID.");
        
    //     return;
    // }
    if (!userType || !id || !bookingPersonName) {
      alert("Please select user type and enter both ID and name.");
      return;
    }
    setVerifying(true); // Start verification process

    try {
        // console.log("jjjjjjjj");
        // const response = await axios.get(`http://localhost:3001/api/booking/verifyuser`, {
        //     params: { id: id, type: userType }
        // });
        // // console.log("jjjjjjjj");
        
        // if (response.data.verified) {
        //     setIsVerified(true);
        // } else {
        //     alert("Verification failed. Please check your details.");
        // }

        if(bookingPersonName==userData.Applicant_Name && id==userData.userId && userType==userData.userType){
          setIsVerified(true);
        }
        else{
          alert("Verification failed. Please check your Name, User Type and ID");
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        alert("Verification error. Please try again.");
    } finally {
        setVerifying(false); 
    }
};

  
  
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("authToken"));
    setUserData(data);
    console.log(data);
    
  }, []);


  

  useEffect(() => {
    
    // axios
    // .get(`http://localhost:3001/api/halls?Hall_ID=${selectedHall.Hall_ID}`)
    // axios
    // .get(`https://campusease-final.onrender.com/api/halls?Hall_ID=${selectedHall.Hall_ID}`)
    axios
    .get(`${BASE_URL}/api/halls?Hall_ID=${selectedHall.Hall_ID}`)
      .then((response) => {
        setHalls(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hall data:", error);
      });
  }, []);




  ///Handle Booking
  const handleBooking = async (event) => {
    event.preventDefault();

    if (!userData || !userData.token) {
      // Redirect to login if the user is not logged in
      navigate("/login");  
      return;
    }
    // const pdfFile = document.getElementById("pdfUpload").files[0];
    try {
      const data = {
        Contact_Number: userData.Contact_Number,
        Hall_Name: selectedHall.Hall_Name,
        Booking_Person_Name: bookingPersonName,
        User_type: userType,
        Booking_Person_ID: id,
        Affiliated: affiliatedDept,
        Date: selectedDate,
        Time_From: Time_From,
        Time_To: Time_To,
        Reason: reason,
        Price: totalPrice,
      };

    //   const formData = new FormData();
    // // Append the booking data as JSON
    // formData.append("bookingData", JSON.stringify(data));
    // // Append the PDF file
    // if (pdfFile) {
    //   formData.append("pdfFile", pdfFile);
    // }

      const hallBooked = await fetch(
        // "https://campusease-final.onrender.com/api/booking/createBooking",
        // "http://localhost:3001/api/booking/createBooking",

        `${BASE_URL}/api/booking/createBooking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(data),
          // body: formData,  // Send FormData with the booking and PDF
        }
      );

      if (hallBooked.status === 200) {
        console.log("Booking created successfully");
        setShowSuccessMessage(true); //SUCCESS MESSAGE
        setShowErrorMessage(false);

        event.target.reset();

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else if(hallBooked.status == 401) {
        setErrorMessage("You must be logged in to book a hall.");
        setShowErrorMessage(true);
      }
      else {
        console.error("Failed to create booking");
        const responseData = await hallBooked.json();
        setErrorMessage(responseData?.msg || "Failed to create booking.");
        setShowErrorMessage(true);
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };
  //

  //AVAILABLE SLOTS
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      console.log("Fetching available time slots...");
      // fetch(
      //   `http://localhost:3001/api/booking/availableslots?hallname=${selectedHall.Hall_Name}&date=${selectedDate}`
      // )
      // fetch(
      //   `https://campusease-final.onrender.com/api/booking/availableslots?hallname=${selectedHall.Hall_Name}&date=${selectedDate}`
      // )
      fetch(
        `${BASE_URL}/api/booking/availableslots?hallname=${selectedHall.Hall_Name}&date=${selectedDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          const availableTimeSlots = data.availableTimeSlots.map(
            (timeStr) => new Date(timeStr)
          );
          setAvailableTimes(availableTimeSlots);
        });
    }
  }, [selectedDate]);








  const calculateTotalPrice = () => {
    const pricePerHour = selectedHall.Price ;
    console.log(pricePerHour);
    
    if (!Time_From || !Time_To) return 0;

    console.log("Raw Time_From:", Time_From);
    console.log("Raw Time_To:", Time_To);


    const fromTime = new Date(Time_From);
    const toTime = new Date(Time_To);

    console.log(fromTime);
    console.log(toTime);


    const hours = (toTime - fromTime) / (1000 * 60 * 60);
  
    console.log(`hours: ${hours}`); 
    // console.log("Type of Hours:", typeof hours);
    
    // to use this change const hours to let hours, as const make it immutable. thus cannot be changed
    // if(hours===0.5) hours = 1;
    // const totalHours = Math.ceil(hours);
  
    // return totalHours * pricePerHour;
    let price= hours * pricePerHour;
    if(userType=='student') price = price*0.3; // discount of 70% to students
    else if(userType=='faculty') price=  price *0.6; //discount of 40%
    return price;
  };
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    if(totalPrice>0)setTotalPrice(totalPrice); // Update price dynamically
    else setTotalPrice(0);
  }, [Time_From, Time_To]);






  useEffect(() => {
    // Set the initial value to the first element of availableTimes
    if (availableTimes.length > 0) {
      setTimeFrom(availableTimes[0]);
      setTimeTo(availableTimes[0]);
    }
  }, [availableTimes]);

  const [timeToOptions, setTimeToOptions] = useState([]);
  
  const handleTimeFromChange = (event) => {
    console.log("Selected Time_From:", event.target.value);
    setTimeFrom(event.target.value);
  };

  useEffect(() => {
    const index = availableTimes.findIndex(
      (time) =>
        time.toLocaleTimeString() === new Date(Time_From).toLocaleTimeString()
    );
    const timeToOptions = availableTimes.slice(index + 1).map((time, index) => (
      <option key={index} value={time}>
        {time.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </option>
    ));
    setTimeToOptions(timeToOptions);
  }, [Time_From]);

  const handleTimeToChange = (event) => {
    console.log("Selected Time_TO:", event.target.value);
    setTimeTo(event.target.value);
    console.log("called price calculating function");
    
  };
//   useEffect(() => {
//     console.log("Updated Time_To:", Time_To);
//     console.log(calculateTotalPrice()); 
// }, [Time_To]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };
  //


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        setProposalPDF(file);
        console.log("Uploaded PDF:", file.name);
    } else {
        alert("Please upload a valid PDF file.");
    }
  };



  return (
    <div className="sm:p-14 p-3 bg-zinc-100">
      <div className="text-sm sm:text-lg">
        Fill the following details and click submit to book the hall
      </div>
      {showSuccessMessage && (
        <PopupModal
          setShowModal={setShowSuccessMessage}
          message={
            "Your request has been sucessfully sent to the hall incharge."
          }
        />
      )}

      {showErrorMessage && (
        <PopupModal
          setShowModal={setShowErrorMessage}
          message={errorMessage || "There occurred an error, please try again."}
        />
      )}

      <form className="py-10 sm:pr-20" onSubmit={handleBooking}>
        <table className="table-auto w-full">
          <tbody>
            
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  HALL FOR BOOKING
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={selectedHall.Hall_Name}
                  readOnly
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  Contact Number
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="tel"
                  value={userData.Contact_Number}
                  readOnly
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  BOOKING PERSON NAME
                <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  onChange={(e) => {
                    setBookingPersonName(e.target.value);
                  }}
                  required
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            {/* this field added :: change */}
            <tr> 
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  USER TYPE
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  value={userType}
                  onChange={(e) => {
                    setIsVerified(false);
                    const selectedValue = e.target.value;
                    setUserType(selectedValue);
                    
                    if (selectedValue === "visitor") {
                      setIsVerified(true);
                    }
                  }}
                  required
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                >
                  <option value="">Select User Type</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="visitor">Visitor</option>
                </select>
              </td>
            </tr>
            <tr>
            
            {userType === "student" || userType === "faculty" ? (
              <>
                <td className="w-1/6 sm:w-1/3 p-4">
                  <label className="text-sm sm:text-lg font-bold text-gray-900 flex items-center">
                    {userType === "student" ? "Register Number" : "Faculty ID"} 
                    <span className="mx-3 font-bold">:</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => {
                      setId(e.target.value)
                      setIsVerified(false);
                    }}
                    className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder="Enter your ID"
                    required
                  />
                </td>
                <td>
                  <span
                    className={isVerified ? "text-green-500 font-semibold flex items-center gap-1" : "text-blue-600 cursor-pointer hover:underline"}
                    onClick={handleVerification}
                  >
                    {verifying ? "Verifying..." : isVerified ? <><FaCheckCircle className="text-green-500" /> Verified</> : "Verify"}
                  </span>
                </td>
              </>
            ) : null}
            </tr>
          
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  AFFILIATED DEPARTMENT/ CLUB
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  onChange={(e) => {
                    setAffiliatedDept(e.target.value);
                  }}                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                   required
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  DATE
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="date"
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  disabled={!isVerified}
                  onChange={handleDateChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  TIME FROM
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  id="TimeFrom"
                  value={Time_From}
                  onChange={handleTimeFromChange}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                  required
                >
                  <option disabled value="">
                    Select a time
                  </option>
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time.toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  TIME TO
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  id="TimeTo"
                  value={Time_To}
                  onChange={handleTimeToChange}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                  required
                >
                  <option value="">Select a time</option>
                  {timeToOptions}
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  Price 
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  value={`₹ ${totalPrice}`}
                  readOnly  
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  disabled={!isVerified}
                  required
                />
              </td> 
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4 align-top">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  REASON
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td className="pt-4">
                <textarea
                  onChange={(e) => {  
                    setReason(e.target.value);
                  }}
                  required
                  className="bg-[#f8fafa] h-24 border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                />
              </td>
            </tr>
            {/* <tr>
              <td className="w-1/6 sm:w-1/3 p-4 align-top">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                Upload Proposal PDF
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td className="pt-4">
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={handleFileUpload} 
                  required
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  disabled={!isVerified}
                />
              </td>
            </tr> */}
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4 align-top" colSpan={2}>
                
                <label className="flex items-center mt-4">
                  <input 
                    type="checkbox" 
                    disabled={!isVerified}
                    required
                    checked={isAccepted} 
                    onChange={(e) => setIsAccepted(e.target.checked)} 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-900">
                    I accept the conditions and agree to pay ₹{totalPrice}.
                  </span>
                
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium mt-5 rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Send Book Request
        </button>
      </form>
    </div>
  );
}

export default StudentDashboardHallBookingBookingForm;

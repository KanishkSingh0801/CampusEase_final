import { useState } from "react";

import email_id_input from "../assets/email_id_input.png";
import password_input from "../assets/password_input.png";

import { useNavigate } from "react-router-dom";
import { FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RegisterCenterContent() {
  const [Applicant_Name, setName] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userExist, setuserExist] = useState();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [Contact_Number, setContactNumber] = useState();
  const [numberError, setNumberError] = useState(false);
  // const [isValid, setIsValid] = useState(false);
  // const [checking, setChecking] = useState(false);
  // const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  // const [contactnumErrorMessage, setContactNumErrorMessage] = useState("");

  const [registerError, setRegisterError] = useState(""); //this is made to  show a error messege if user tries to register without getting verified foe unique username

  const [userExistbyContact, setUserExistbyContact] = useState();

  // something new coming up
  const [userType, setUserType] = useState("");
  const [idVerification, setIdVerification] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMsg, setVerificationMsg] = useState("");

  const navigate = useNavigate();

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(Password !== e.target.value);
  };

  // const handleusername =(e)=>{
  //   setUser_Name(e.target.value);
  //   setIsValid(false);
  // }
  // const handlecontactnumber =(e)=>{
  //   setContactNumber(e.target.value);
  //   setIsValid(false);
  // }

  // const handleCheckUsername = async () => {
  //   if (User_Name.length < 3) {
  //     setIsValid(false);
  //     setUsernameErrorMessage("Username must be at least 3 characters.");
  //     setTimeout(() => setUsernameErrorMessage(""), 3000);
  //     return;
  //   }

  //   setChecking(true);
  //   try {

  //     const response = await axios.get(`http://localhost:3001/api/auth/checkusername`, {
  //       params: { User_Name },
  //     });
  //     if (response.data.isUnique) {
  //       setIsValid(true);
  //     } else {
  //       setIsValid(false);
  //       setUsernameErrorMessage("Username is already taken. Use a different one.");
  //       setTimeout(() => setUsernameErrorMessage(""), 3000);
  //     }
  //   } catch (error) {
  //     console.error("Error checking username:", error);
  //     setIsValid(false);
  //   } finally {
  //     setChecking(false);
  //   }
  // };

  // const handleCheckContactNumber = async () => {
  //   if (contactNumber.length !=10) {
  //     setIsValid(false);
  //     setContactNumErrorMessage("contact number of 10 digits.");
  //     setTimeout(() => setContactNumErrorMessage(""), 3000);
  //     return;
  //   }

  //   setChecking(true);
  //   try {

  //     const response = await axios.get(`http://localhost:3001/api/auth/checkusername`, {
  //       params: { User_Name },
  //     });
  //     if (response.data.isUnique) {
  //       setIsValid(true);
  //     } else {
  //       setIsValid(false);
  //       setUsernameErrorMessage("Username is already taken. Use a different one.");
  //       setTimeout(() => setUsernameErrorMessage(""), 3000);
  //     }
  //   } catch (error) {
  //     console.error("Error checking username:", error);
  //     setIsValid(false);
  //   } finally {
  //     setChecking(false);
  //   }
  // };
  //   try {
  //     const response = await axios.get(`http://localhost:3001/api/auth/checkcontactnumber`, {
  //       params: { User_Name },
  //     });
  //     if (response.data.isUnique) {
  //       setIsValid(true);
  //     } else {
  //       setIsValid(false);
  //       setUsernameErrorMessage("user with this number already exist");
  //       setTimeout(() => setUsernameErrorMessage(""), 3000);
  //     }
  //   } catch (error) {
  //     console.error("Error checking username:", error);
  //     setIsValid(false);
  //   } finally {
  //     setChecking(false);
  //   }
  // };

  const handleVerifyID = async () => {
    if (userType === "visitor") {
      setIsVerified(true);
      setVerificationMsg("No verification needed for visitors.");
      return;
    }

    if (!userType || !idVerification) {
      alert("Please select a user type and enter the ID.");
      return;
    }

    setIsVerifying(true);
    setVerificationMsg("");

    try {
      const response = await axios.get(`${BASE_URL}/api/auth/verifyuser`, {
        // const response = await axios.get(`http://localhost:3001/api/auth/verifyuser`, {
        // const response = await axios.get(`https://campusease-final.onrender.com/api/auth/verifyuser`, {
        params: { id: idVerification, type: userType, name: Applicant_Name },
        validateStatus: function (status) {
          // Accept all responses so we can handle manually
          return true;
        },
      });

      if (response.status === 200 && response.data.verified) {
        setIsVerified(true);
        setVerificationMsg(`Verified: ${response.data.name}`);
        // console.log(response.data.name);
        // console.log(response.data.message);
      } else {
        // console.log("idhar aao");

        setIsVerified(false);
        // setVerificationMsg('Verification failed. Please check your details.');
        setVerificationMsg(`Not Verified: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setIsVerified(false);
      setVerificationMsg("Verification error. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRegister = async (e) => {
    // Check native form validation first
    const form = e.target;
    if (!form.checkValidity()) {
      return; // Let browser show the required field warning
    }

    e.preventDefault();

    if ((userType === "student" || userType === "faculty") && !isVerified) {
      alert("Please verify your ID first.");
      return;
    }

    if (Password === confirmPassword) {
      const data = {
        Contact_Number,
        Applicant_Name,
        Password,
        Email,
        userType,
        userId: userType === "visitor" ? null : idVerification,
      };

      console.log("Data being sent to backend:", data);
      try {
        console.log("hello");

        const response = await fetch(
          // "https://campusease-final.onrender.com/api/auth/register",
          // "http://localhost:3001/api/auth/register",
          `${BASE_URL}/api/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await response.json();
        console.log("Response:", result);
        console.log("hhhhhhhhhhhhh");

        if (response.status === 201) {
          localStorage.setItem("authToken", JSON.stringify(result));
          console.log("Token stored...");
          navigate("../student/dashboard");
        } else if (response.status === 401) {
          console.log("user exist");
          setuserExist(true);
          setTimeout(() => {
            setuserExist(false);
          }, 4000);
        } else if (response.status === 410) {
          console.log("user exist");
          setUserExistbyContact(true);
          setTimeout(() => {
            setUserExistbyContact(false);
          }, 4000);
        } else if (response.status === 402) {
          console.log("use strong password");
          setPasswordError(true);
          setTimeout(() => {
            setPasswordError(false);
          }, 4000);
        } else if (response.status === 409) {
          console.log("Invalid Contact Number");
          setNumberError(true);
          setTimeout(() => {
            setNumberError(false);
          }, 4000);
        } else {
          console.error("Registration failed:", result);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("password didnt matched!");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 my-20">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10  p-2.5"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  pattern="[0-9]{10}"
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                  className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10  p-2.5"
                  placeholder="Enter unique username"
                  required
                />
              </div>
              {userExistbyContact && (
                <div role="alert">
                  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    User with this contact number already exist !!!
                  </div>
                  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>
                      Please use a different contact number or log in instead.
                    </p>
                  </div>
                </div>
              )}
              {numberError && (
                <div role="alert">
                  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Enter Correct Contact Number!!
                  </div>
                  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Enter 10 digit contact number withoutany space.</p>
                  </div>
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email ID
                </label>
                <div className="flex">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img
                      src={email_id_input}
                      className="h-5"
                      alt="email-icon"
                    ></img>
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-neutral-100 text-blue sm:text-sm rounded-sm block w-full h-10 p-2.5"
                    placeholder="applicant@gmail.com"
                    required
                  />
                </div>
              </div>
              {userExist && (
                <div role="alert">
                  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    User with this email already exist !!!
                  </div>
                  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Please use a different email or log in instead.</p>
                  </div>
                </div>
              )}

              {/*  something new coming up */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  You are a:
                </label>
                <select
                  value={userType}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    setUserType(selectedType);
                    setIdVerification(""); // Clear ID input
                    // setIsVerified(false); // Reset verification
                    setVerificationMsg("");
                    if (selectedType === "visitor") {
      setIsVerified(true); // Automatically verified
    } else {
      setIsVerified(false); // Requires manual verification
    } 
                  }}
                  className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10 p-2.5"
                  required
                >
                  <option value="">Select your role </option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="visitor">Visitor</option>
                </select>
              </div>

              {(userType === "student" || userType === "faculty") && (
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    {userType.charAt(0).toUpperCase() + userType.slice(1)} ID
                    Verification
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={idVerification}
                      onChange={(e) => {
                        setIdVerification(e.target.value);
                        setIsVerified(false);
                        setVerificationMsg("");
                      }}
                      placeholder={`Enter your ${userType} ID`}
                      className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10 p-2.5"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleVerifyID}
                      disabled={isVerified || isVerifying || !idVerification}
                      className={`text-sm font-medium ${
                        isVerified
                          ? "text-green-600"
                          : "text-blue-600 hover:underline"
                      }`}
                    >
                      {isVerified
                        ? "Verified"
                        : isVerifying
                        ? "Verifying..."
                        : "Verify"}
                    </button>
                  </div>
                  {verificationMsg && (
                    <p
                      className={`text-sm mt-1 ${
                        isVerified ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {verificationMsg}
                    </p>
                  )}
                </div>
              )}
              {/* {
                userType==='visitor' && (setIsVerified(true))
              } */}
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Password
                </label>
                <div className="flex items-center">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img
                      src={password_input}
                      className="h-5"
                      alt="lock-icon"
                    ></img>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    // className="bg-neutral-100 rounded-sm block w-full h-10 p-2.5"
                    className={`block w-full h-10 p-2.5 rounded-sm 
      ${isVerified ? 'bg-neutral-100 text-black' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    disabled={!isVerified}
                    required
                  />
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700 relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    // onClick={handleibutton}
                  >
                    <FaInfoCircle size={18} />
                  </button>
                  {showTooltip && (
                    <div
                      className="absolute top-12 right-0 bg-white border border-gray-300 shadow-md rounded-md p-2 w-64 text-sm text-gray-700"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <p className="font-medium">Password must:</p>
                      <ul className="list-disc ml-4">
                        <li>Be 6-18 characters long</li>
                        <li>Contain at least one number</li>
                        <li>
                          Contain at least one special character (!@#$%^&*)
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {passwordError && (
                <div role="alert">
                  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Make a Strong Password !!!
                  </div>
                  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>
                      Password must be 6-18 characters long, include a number
                      and a special character.
                    </p>
                  </div>
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Confirm password
                </label>
                <div className="flex">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img
                      src={password_input}
                      className="h-5"
                      alt="lock-icon"
                    ></img>
                  </div>
                  <input
                    type="password"
                    name="confirm-password"
                    onChange={handleConfirmPasswordChange}
                    placeholder="••••••••"
                    // className="bg-neutral-100 rounded-sm block w-full h-10 p-2.5"
                    className={`block w-full h-10 p-2.5 rounded-sm 
      ${isVerified ? 'bg-neutral-100 text-black' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    disabled={!isVerified}
                    required
                  />
                </div>
              </div>
              {passwordMismatch && (
                <div
                  role="alert"
                  className="border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700"
                >
                  <span>Passwords do not match!</span>
                </div>
              )}

              <div className="flex items-center justify-center">
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-sky-500 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </div>

              {/* <button
                type="submit"
                // onClick={handleRegister}
                className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
                disabled={!isVerified}
              >
                Register
              </button> */}
<button
  type="submit"
  // onClick={handleRegister}
  className={`w-full text-white font-medium rounded-sm text-sm px-5 py-2.5 text-center 
    ${isVerified ? 'bg-sky-500 hover:bg-primary-700 focus:ring-primary-300' : 'bg-gray-400 cursor-not-allowed'}
    focus:outline-none focus:ring-4`}
  disabled={!isVerified}
>
  Register
</button>

              {registerError && (
                <p className="text-xs text-red-500 mt-2">{registerError}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCenterContent;

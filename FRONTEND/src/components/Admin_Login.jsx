import email_id_input from "../assets/admin_profile_icon.png";
import password_input from "../assets/password_input.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
// const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Admin_Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const userData = await fetch(`${BASE_URL}/api/admin/login`, {
    // const userData = await fetch("http://localhost:3001/api/admin/login", {
    // const userData = await fetch("https://campusease-final.onrender.com/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (userData.status === 401) {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 4000);
    }

    if (userData.status === 200) {
      const token = await userData.json();
      localStorage.setItem("authToken", JSON.stringify(token));
      navigate("../admin/dashboard");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 my-20">
        <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold text-gray-900 md:text-2xl">
              Admin Login
            </h1>

            {errorMessage && (
              <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Invalid Credentials !!!
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>Email or Password is incorrect.</p>
                </div>
              </div>
            )}

            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email ID
                </label>
                <div className="flex">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img src={email_id_input} className="h-5" alt="email-icon" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="bg-neutral-100 text-blue sm:text-sm rounded-sm block w-full h-10 p-2.5"
                    placeholder="admin@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="flex relative">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img src={password_input} className="h-5" alt="lock-icon" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="bg-neutral-100 rounded-sm block w-full h-10 p-2.5 pr-10"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_Login;

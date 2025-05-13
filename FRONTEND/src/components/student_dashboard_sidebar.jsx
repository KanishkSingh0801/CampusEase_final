import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboard_icon_grey from "../assets/dashboard_icon_grey.png";
import dashboard_icon_white from "../assets/dashboard_icon_white.png";
import hall_icon_grey from "../assets/hall_icon_grey.png";
import hall_icon_white from "../assets/hall_icon_white.png";
import calendar_icon_grey from "../assets/calendar_icon_grey.png";
import calendar_icon_white from "../assets/calendar_icon_white.png";
import message_icon_grey from "../assets/message_icon_grey.png";
import message_icon_white from "../assets/message_icon_white.png";
import logout_icon_grey from "../assets/logout_icon_grey.png";
import profile from "../assets/email_id_input.png";

function StudentDashboardSidebar({ data, changeRefreshState }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("authToken")));
  }, []);

  useEffect(() => {
    const changeWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  const menuItems = [
    { name: "Dashboard", key: "dashboard", icon: dashboard_icon_grey, activeIcon: dashboard_icon_white, path: "/student/dashboard" },
    { name: "Resource Calendar", key: "hall_availability", icon: calendar_icon_grey, activeIcon: calendar_icon_white, path: "/student/dashboard/hall_availability" },
    { name: "Resource Booking", key: "hall_booking", icon: hall_icon_grey, activeIcon: hall_icon_white, path: "/student/dashboard/hall_booking" },
    { name: "Booking Status", key: "pending_requests", icon: message_icon_grey, activeIcon: message_icon_white, path: "/student/dashboard/pending_requests" },
  ];

  return (
    <div className="p-2 bg-white w-full flex flex-col md:w-80 rounded-lg shadow-lg">
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-end">
        <button
          id="menuBtn"
          onClick={() => setToggleMenu(!toggleMenu)}
          className="bg-gray-300 p-2 rounded w-10 h-10 flex justify-center items-center hover:bg-gray-400"
        >
          {toggleMenu ? <i className="fa-solid fa-xmark text-lg"></i> : <i className="fa-solid fa-bars text-lg"></i>}
        </button>
      </div>

      {/* Sidebar Content */}
      {(toggleMenu || screenWidth > 768) && (
        <nav className="w-full">
          {/* Profile Section */}
          <div className="flex items-center p-4 bg-blue-50 rounded-lg mb-4">
            <img src={profile} className="h-12 w-12 rounded-full border-2 border-gray-300" alt="Profile" />
            <div className="ml-3">
              <div className="font-bold text-lg text-blue-900">{userData?.Applicant_Name || "User"}</div>
              <div className="text-xs text-gray-600">{userData?.Email || "user@example.com"}</div>
            </div>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <a
              key={item.key}
              className={`block py-2.5 px-4 my-2 rounded-lg transition duration-300 ${
                data === item.key ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
              href={item.path}
            >
              <div className="flex items-center">
                <img src={data === item.key ? item.activeIcon : item.icon} className="h-5 w-5 mr-3" alt={item.name} />
                {item.name}
              </div>
            </a>
          ))}

          {/* Logout Button */}
          <button
            className="w-full py-2.5 px-4 my-4 rounded-lg text-red-600 font-semibold hover:bg-red-100 transition duration-300"
            onClick={() => setShowModal(true)}
          >
            <div className="flex items-center">
              <img src={logout_icon_grey} className="h-5 w-5 mr-3" alt="Logout" />
              Logout
            </div>
          </button>
        </nav>
      )}

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-700">Do you really want to logout?</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  changeRefreshState();
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboardSidebar;

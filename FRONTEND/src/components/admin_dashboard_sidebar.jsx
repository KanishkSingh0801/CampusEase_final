import dashboard_icon_grey from "../assets/dashboard_icon_grey.png";
import dashboard_icon_white from "../assets/dashboard_icon_white.png";
import calendar_icon_white from "../assets/calendar_icon_white.png";
import calendar_icon_grey from "../assets/calendar_icon_grey.png";
import message_icon_grey from "../assets/message_icon_grey.png";
import message_icon_white from "../assets/message_icon_white.png";
import logout_icon_grey from "../assets/logout_icon_grey.png";
import profile from "../assets/admin_profile_icon.png";
import hall_icon_grey from "../assets/hall_icon_grey.png";
import hall_icon_white from "../assets/hall_icon_white.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboardSidebar(props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const userData = JSON.parse(localStorage.getItem("authToken"));

  const activeStyle = {
    backgroundColor: "rgb(14, 165, 233)",
    color: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="p-2 bg-white w-full flex justify-end md:w-96 md:flex md:flex-col md:justify-between border-r border-gray-200 shadow-sm">
      <div className="md:hidden flex items-center">
        <button
          id="menuBtn"
          className="bg-neutral-100 p-2 rounded w-8 h-8 flex justify-center items-center hover:bg-neutral-300 transition"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <nav className="hidden md:block">
        {/* Profile Section */}
        <div className="flex justify-start items-center mt-2 mb-6 p-2">
          <div className="bg-gray-300 h-14 w-14 mr-3 rounded-full flex justify-center items-center shadow-sm">
            <img src={profile} className="h-10 w-10" alt="profile-icon" />
          </div>
          <div className="font-bold text-xl text-gray-800">{userData.adminName}</div>
        </div>

        {/* Sidebar Links */}
        <a
          className="block text-gray-600 py-2.5 px-4 my-2 rounded-md transition-all hover:bg-blue-100 hover:text-blue-600"
          style={props.data === "dashboard" ? activeStyle : {}}
          href="/admin/dashboard"
        >
          <div className="flex items-center">
            <img
              src={props.data === "dashboard" ? dashboard_icon_white : dashboard_icon_grey}
              className="h-5 w-5 mr-2"
              alt="dashboard-icon"
            />
            <div>Dashboard</div>
          </div>
        </a>

        <a
          className="block text-gray-600 py-2.5 px-4 my-2 rounded-md transition-all hover:bg-blue-100 hover:text-blue-600"
          style={props.data === "hall_availability" ? activeStyle : {}}
          href="/admin/dashboard/hall_availability"
        >
          <div className="flex items-center">
            <img
              src={props.data === "hall_availability" ? calendar_icon_white : calendar_icon_grey}
              className="h-5 w-5 mr-2"
              alt="hall-icon"
            />
            <div>Hall Availability</div>
          </div>
        </a>

        <a
          className="block text-gray-600 py-2.5 px-4 my-2 rounded-md transition-all hover:bg-blue-100 hover:text-blue-600"
          style={props.data === "hall_listing" ? activeStyle : {}}
          href="/admin/dashboard/hall_listing"
        >
          <div className="flex items-center">
            <img
              src={props.data === "hall_listing" ? hall_icon_white : hall_icon_grey}
              className="h-5 w-5 mr-2"
              alt="hall-icon"
            />
            <div>Hall listing</div>
          </div>
        </a>

        <a
          className="block text-gray-600 py-2.5 px-4 my-2 rounded-md transition-all hover:bg-blue-100 hover:text-blue-600"
          style={props.data === "pending_requests" ? activeStyle : {}}
          href="/admin/dashboard/pending_requests"
        >
          <div className="flex items-center">
            <img
              src={props.data === "pending_requests" ? message_icon_white : message_icon_grey}
              className="h-5 w-5 mr-2"
              alt="message-icon"
            />
            <div>Pending Requests</div>
          </div>
        </a>

        {/* Logout Button */}
        <button
          className="text-gray-600 w-full py-2.5 px-4 my-2 rounded-md flex items-center transition-all hover:bg-red-100 hover:text-red-600"
          onClick={() => setShowModal(true)}
        >
          <img src={logout_icon_grey} className="h-5 w-5 mr-2" alt="logout-icon" />
          <div>Logout</div>
        </button>
      </nav>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80">
              <p className="text-gray-700 text-lg font-semibold text-center">
                Do you really want to logout?
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    if (props.changeRefreshState) {
                      props.changeRefreshState(); // Safely call the function
                    }
                    navigate("/");
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboardSidebar;

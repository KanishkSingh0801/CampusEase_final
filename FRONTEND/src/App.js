import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePageCenterContent from "./components/HomePageCenterContent";
import LoginCenterContent from "./components/LoginCenterContent";
import RegisterCenterContent from "./components/RegisterCenterContent";
import StudentDashboardMainPage from "./views/StudentDashboardMainPage";
import StudentDashboardHallBookingMainPage from "./views/StudentDashboardHallBookingMain";
import StudentDashboardPendingRequests from "./views/StudentDashboardPendingRequests";
import StudentDashboardHallAvailability from "./views/StudentDashboardHallAvailability";
import AdminDashboardMainPage from "./views/AdminDashboardMainPage";
import AdminDashboardPendingRequests from "./views/AdminDashboardPendingRequests";
import AdminDashboardHallAvailability from "./views/AdminDashboardHallAvailability";


import AdminHallListingPage from "./views/AdminHallListingPage";


import CalendarCom from "./components/calendar";
import HallDetailMain from "./components/student_dashboard_hall_booking";
import Admin_Login from "./components/Admin_Login";
import CampusMap from "./components/CampusMap"; // Ensure the filename matches exactly


function App() {
  const [refresh, setRefresh] = useState(false);

  const changeRefreshState = () => {
    setRefresh(!refresh);
  };

  const isHeader = () => {
    const pathname = window.location.pathname;
    return (
      pathname === "/" ||
      pathname === "/calendar" ||
      pathname.startsWith("/hall_details") ||
      pathname.startsWith("/admin_login")
    );
  };

  useEffect(() => {
    isHeader();
  }, [refresh]);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header data={{ flag: isHeader() }} />
        <Routes>
          <Route path="/" element={<HomePageCenterContent />} />
          <Route path="/admin_login" element={<Admin_Login />} />
          <Route path="/login" element={<LoginCenterContent />} />
          <Route path="/register" element={<RegisterCenterContent />} />
          <Route
            path="/student/dashboard"
            element={
              <StudentDashboardMainPage
                data={"dashboard"}
                changeRefreshState={changeRefreshState}
              />
            }
          />
          <Route
            path="/student/dashboard/hall_booking"
            element={
              <StudentDashboardHallBookingMainPage
                data={"hall_booking"}
                changeRefreshState={changeRefreshState}
              />
            }
          />
          <Route
            path="/student/dashboard/pending_requests"
            element={
              <StudentDashboardPendingRequests
                data={"pending_requests"}
                changeRefreshState={changeRefreshState}
              />
            }
          />
          <Route
            path="/student/dashboard/hall_availability"
            element={
              <StudentDashboardHallAvailability
                data={"hall_availability"}
                changeRefreshState={changeRefreshState}
              />
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminDashboardMainPage
                data={"dashboard"}
                changeRefreshState={changeRefreshState}
              />
            }
          />
          <Route
            path="/admin/dashboard/pending_requests"
            element={
              <AdminDashboardPendingRequests data={"pending_requests"} />
            }
          />
          <Route
            path="/admin/dashboard/hall_availability"
            element={
              <AdminDashboardHallAvailability data={"hall_availability"} />
            }
          /> 
          <Route
            path="/admin/dashboard/hall_listing"
            element={
              <AdminHallListingPage data={"hall_listing"} />
            }
          />

          <Route path="/calendar" element={<CalendarCom />} />
          <Route path="/hall_details" element={<HallDetailMain />} />
          <Route path="/campus_map" element={<CampusMap />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

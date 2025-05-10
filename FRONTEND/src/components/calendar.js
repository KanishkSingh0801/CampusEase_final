
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import axios from "axios";
// const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function CalendarCom() {
  const [events, setEvents] = useState([]);

  // Helper function to determine event color
  const getEventColor = (status, isPaid) => {
    if (status === "approved") {
      return isPaid ? "#22c55e" : "#facc15"; // Green if paid, yellow if just approved
    }
    switch (status) {
      case "rejected":
        return "#ef4444"; // red
      default:
        return "#9ca3af"; // grey
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("authToken");

    let parsedData = null;
    try {
      parsedData = storedData ? JSON.parse(storedData) : null;
    } catch (err) {
      console.error("Invalid JSON in localStorage", err);
      return;
    }

    const token = parsedData?.token;

    if (!token) {
      console.error("Token not found");
      return;
    }

    axios
      .get(`${BASE_URL}/api/booking/allBookings`, {
      // .get("http://localhost:3001/api/booking/allBookings", {
      // .get("https://campusease-final.onrender.com/api/booking/allBookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response from Calendar:", response.data);

        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid data format received from API");
          return;
        }

        const bookings = response.data;
        setEvents(
          bookings.map((booking) => ({
            start: new Date(booking.Time_From).toISOString(),
            end: new Date(booking.Time_To).toISOString(),
            title: booking.Hall_Name,
            color: getEventColor(booking.Status, booking.PaymentStatus),
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
      });
  }, []);

  return (
    <div className="w-full p-2 md:p-8 bg-zinc-100">
      <div className="bg-white p-5">
        <FullCalendar
          initialView="dayGridMonth"
          themeSystem="standard"
          plugins={[dayGridPlugin]}
          events={events}
          displayEventEnd={true}
          eventMinHeight={30}
          eventDisplay="block"
          dayMaxEventRows={2}
          moreLinkClick="popover"
        />
      </div>
    </div>
  );
}

export default CalendarCom;
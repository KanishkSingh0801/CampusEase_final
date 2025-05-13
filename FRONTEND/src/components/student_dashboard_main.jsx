function StudentDashboardMain() {
  return (
    <div className="p-6 md:p-10 md:pl-16 pb-20 bg-gray-50 w-full text-base">
      {/* Two-column flex layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Side: Halls Booking Section */}
        <div className="md:w-1/2 flex flex-col">
          {/* Title */}
          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">
            RESOURCES BOOKING
          </div>

          {/* Hall Availability Link */}
          <div className="mb-4">
            <a
              className="text-blue-600 hover:text-blue-800 transition-all duration-300 font-semibold underline"
              href="/student/dashboard/hall_availability"
            >
              Click here
            </a> to check the availability of resources.
          </div>

          {/* Hall List Box */}
          <div className="bg-white shadow-md rounded-xl p-6 h-full flex flex-col">
            <div className="text-lg font-semibold mb-4">Available Resources:</div>
            <ol className="list-decimal ml-5 mt-5 text-lg text-gray-700 leading-loose space-y-3">
            {[
              { name: "Silveria", icon: "🏛️" },
              { name: "Golden Jubilee Hall", icon: "🏨" },
              { name: "Basketball Court", icon: "🏀" },
              { name: "Cricket Ground", icon: "🏏" },
              { name: "Tennis Court", icon: "🎾" },
              { name: "Student Activity Center", icon: "🏫" },
              { name: "Volleyball Court", icon: "🏐" },
              { name: "Sports Complex", icon: "🏟️" },
              { name: "Gymnasium", icon: "💪" },
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ol>
          </div>
        </div>

        {/* Right Side: Steps for Booking */}
        <div className="md:w-1/2">
          <div className="bg-blue-100 p-6 sm:p-10 rounded-xl shadow-lg border-2 border-blue-500 h-full flex flex-col">
            <div className="text-gray-900 font-bold text-2xl flex items-center">
              <i className="fa-solid fa-bookmark text-blue-700 mr-2"></i> STEPS FOR BOOKING
            </div>
            <ul className="list-none ml-5 mt-5 space-y-3 text-gray-800">
             
              <li>
                <i className="fa-solid fa-calendar-check text-blue-700 mr-2"></i>
                Check the Resource Calendar for availability of the resources on specific dates.
              </li>
              <li>
                <i className="fa-solid fa-pen-to-square text-blue-700 mr-2"></i>
                Click "Book Now" and fill in the form and submit.
              </li>
              <li>
                <i className="fa-solid fa-envelope text-blue-700 mr-2"></i>
                You will <span className="font-bold">receive</span> an email upon submission and another after approval.
              </li>
              <li>
                <i className="fa-solid fa-list-check text-blue-700 mr-2"></i>
                Track your booking status from your dashboard.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardMain;

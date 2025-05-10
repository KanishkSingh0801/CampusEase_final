function HomePageCenterContent() {
  return (
    <div className="text-xs sm:text-base">
      <div className="flex flex-wrap items-center p-2 sm:p-10">
        
        {/* Left Section - Booking Info */}
        <div className="sm:w-6/12 w-full px-5 sm:px-16 mt-5 sm:mt-0">
          <div className="text-4xl sm:text-6xl font-extrabold text-gray-800 drop-shadow-md">
            RESOURCE BOOKING
          </div>

          <div className="text-lg sm:text-2xl font-semibold text-gray-700 mt-5 sm:mt-8">
            AVAILABLE RESOURCES FOR BOOKING
          </div>

          <div className="mt-5">
            <a className="text-blue-600 hover:underline hover:cursor-pointer text-lg font-bold" href="/calendar">
              Click here
            </a>
            <span className="text-gray-600"> to check availability of resources</span>
          </div>

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

        {/* Right Section - Booking Steps */}
        <div className="sm:w-6/12 w-full p-5 sm:p-10">
          <div className="bg-gradient-to-r from-sky-200 to-blue-300 p-5 sm:p-10 rounded-xl shadow-lg border-2 border-blue-500">
            <div className="text-gray-900 font-bold text-2xl flex items-center">
              <i className="fa-solid fa-bookmark text-blue-700 mr-2"></i> STEPS FOR BOOKING
            </div>
            <ul className="list-none ml-5 mt-5 space-y-3">
              <li className="flex items-center">
                <i className="fa-solid fa-right-to-bracket text-blue-700 mr-2"></i>
                <a className="text-blue-700 hover:underline hover:cursor-pointer font-semibold" href="/login">
                  Click here 
                </a> to login
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-calendar-check text-blue-700 mr-2"></i>
                Check the calendar for availability of the resources on specific dates
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-pen-to-square text-blue-700 mr-2"></i>
                Click "Book Hall" and fill in the form and submit
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope text-blue-700 mr-2"></i>
                You will receive an email upon submitting this form and another after approval.
              </li>
              <li className="flex items-center">
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

export default HomePageCenterContent;

function AdminDashboardMain() {
  return (
    <div className="p-6 md:p-10 md:pl-16 pb-20 bg-gray-50 w-full text-base">
      {/* Two-column flex layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Side: Halls Assigned Section */}
        <div className="md:w-1/2 flex flex-col">
          {/* Title */}
          <div className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
            RESOURCE MANAGEMENT
          </div>

          {/* Pending Requests Link */}
          <div className="mb-4">
            <a
              className="text-red-600 hover:text-red-800 transition-all duration-300 font-semibold underline"
              href="/admin/dashboard/pending_requests"
            >
              Click here
            </a>{" "}
            to check pending requests.
          </div>

          {/* Halls Assigned Box */}
          <div className="bg-white shadow-md rounded-xl p-6 h-full flex flex-col">
            <div className="text-lg font-semibold mb-4">Assigned Halls:</div>
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

        {/* Right Side: Steps for Handling Requests */}
        <div className="md:w-1/2">
          <div className="bg-red-100 p-6 sm:p-10 rounded-xl shadow-lg border-2 border-red-500 h-full flex flex-col">
            <div className="text-gray-900 font-bold text-2xl flex items-center">
              <i className="fa-solid fa-bookmark text-red-700 mr-2"></i> STEPS FOR HANDLING REQUESTS
            </div>
            <ul className="list-none ml-5 mt-5 space-y-3 text-gray-800">
              <li>
                <i className="fa-solid fa-calendar-check text-red-700 mr-2"></i>
                Check the resource calendar for availability.
              </li>
              <li>
                <i className="fa-solid fa-file-alt text-red-700 mr-2"></i>
                Review the submitted request details carefully.
              </li>
              <li>
                <i className="fa-solid fa-check text-green-700 mr-2"></i>
                Click "Approve" if the request is valid.
              </li>
              <li>
                <i className="fa-solid fa-times text-red-700 mr-2"></i>
                Click "Deny" if the request does not meet the criteria.
              </li>
              <li>
                <i className="fa-solid fa-envelope text-red-700 mr-2"></i>
                An email will be sent automatically upon response.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardMain;

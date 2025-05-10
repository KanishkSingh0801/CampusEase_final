import { useState, useEffect } from "react";

function HomePageHeader() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", changeWidth);
    return () => window.removeEventListener("resize", changeWidth);
  }, []);

  return (
    <nav className="mt-3">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        {(toggleMenu || screenWidth > 768) && (
          <ul className="gap-5 font-medium text-white flex flex-col md:flex-row md:space-x-8  backdrop-lg py-3 px-5 rounded-lg shadow-md">
            <li>
              <a href="/" className="hover:text-yellow-400 transition duration-300">
                <i className="fa-solid fa-house text-2xl"></i>
              </a>
            </li>
            <li>
              <a href="/calendar" className="hover:underline hover:text-yellow-400">
                CALENDAR
              </a>
            </li>
            <li>
              <a href="/admin_login" className="hover:underline hover:text-yellow-400">
                ADMIN
              </a>
            </li>
            <li>
              <a href="/hall_details" className="hover:underline hover:text-yellow-400">
                FACILITIES
              </a>
            </li>
            <li>
              <a href="/campus_map" className="hover:underline hover:text-yellow-400">
                CAMPUS MAP
              </a>
            </li>
          </ul>
        )}

        {/* Auth Links */}
        <ul className="mt-3 md:mt-0 flex space-x-4 text-white text-sm">
          <li>
            <a href="/register" className="hover:font-bold hover:text-yellow-400">REGISTER</a>
          </li>
          <li className="hidden md:block">|</li>
          <li>
            <a href="/login" className="hover:font-bold hover:text-yellow-400">LOGIN</a>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setToggleMenu(!toggleMenu)}
          className="md:hidden text-gray-300 text-2xl p-2"
        >
          {toggleMenu ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
        </button>
      </div>
    </nav>
  );
}

export default HomePageHeader;

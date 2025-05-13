import SGSITS_main_logo from "../assets/SGSITS_main_logo.png";
import sgsits from "../assets/sgsits.jpeg";
import HomePageHeader from "./HomePageHeader";

function Header(props) {
  return (
    <header className="relative">
      {/* Background Image */}
      <div
        className="w-full h-full absolute top-0 left-0 z-[-1] bg-cover bg-center"
        style={{ backgroundImage: `url(${sgsits})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>
      </div>

      {/* Navbar */}
      <nav className="relative bg-black/70 backdrop-md py-4 px-5 sm:px-10 shadow-lg rounded-b-lg">
        <div className="flex flex-wrap justify-between items-center">
          
          {/* Left: Logo + Institute Name */}
          <div className="flex items-center">
            <img src={SGSITS_main_logo} className="mr-3 h-16 sm:h-20" alt="SGSITS Logo" />
            <div className="text-white">
              <div className="font-extrabold sm:text-2xl text-xl">
                SHRI GOVINDRAM INSTITUTE OF TECHNOLOGY & SCIENCE
              </div>
              <div className="font-semibold text-sm sm:text-lg">
                RGPV UNIVERSITY, BHOPAL
              </div>
              <div className="font-thin text-xs sm:text-sm">AISHE Code: C-25072</div>
            </div>
          </div>

          {/* Right: Branding */}
          <div className="text-white text-3xl font-extrabold tracking-wide sm:block hidden">
            CampusEase
          </div>
        </div>

        {/* Navigation Links */}
        {props.data.flag && <HomePageHeader />}
      </nav>
    </header>
  );
}

export default Header;

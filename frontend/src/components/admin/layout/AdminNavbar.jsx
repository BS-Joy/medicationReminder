/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../slices/user/userSlice";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({setDropdownOpen, isDropdownOpen, toggleSidebar, toggleDropdown, handleLogout}) => {
  const user = useSelector(getCurrentUser);
  return (
    <>
      {/* Navbar */}
      <header className="bg-white shadow w-full">
        <div className="flex justify-between items-center p-4">
          {/* Hamburger Icon */}
          <div className="p-4 text-right">
            <button onClick={toggleSidebar}>
              <svg
                className="w-6 h-6 text-blue-500 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          {/* Admin Username and Dropdown */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="relative flex items-center text-left">
              <span className="font-semibold flex items-center gap-2"><FaUserCircle />{user?.name}</span>
              <button
                onClick={toggleDropdown}
                className="focus:outline-none"
              >
                <svg
                  className="w-6 h-6 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-md z-10">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

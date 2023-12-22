import {useState} from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../slices/user/userSlice";

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch()
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
    const handleLogout = () => {
      dispatch(logOut())
      console.log('Admin Logged out')
    };
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        {/* Main Content */}
        <div
          className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
            isSidebarOpen ? "ml-0" : "ml-[-16rem]"
          }`}
        >
          {/* Navbar */}
          <AdminNavbar setDropdownOpen={setDropdownOpen} isDropdownOpen={isDropdownOpen} toggleSidebar={toggleSidebar} toggleDropdown={toggleDropdown} handleLogout={handleLogout}  />

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;

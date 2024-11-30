import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";

const Navbar = ({ setAuth, loggedIn}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For sidebar
  const [role, setRole] = useState(null); // Store user role
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");
  if (token && storedRole) {
    setRole(storedRole);
  } else {
    setRole(null);
  }
}, [loggedIn]);
  

  const handleLogout = () => {
    
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("role"); // Remove the role as well
    setAuth(false); // Set the loggedIn state to false
    navigate("/login"); // Redirect to the login page
  };

  return (
    <>
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Online Library
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-500 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-500 font-medium">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Sidebar Toggle Button for Mobile */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Login/Signup or User Icon */}
          <div className="flex items-center space-x-4">
            {loggedIn ? (
              <>
                {/* User Icon, redirects to profile or admin panel based on role */}
                <Link 
                  to={role === "admin" ? "/admin" : "/profile"} 
                  className="text-gray-600 hover:text-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24">
                    <path fill="#b89494" fillOpacity="0.25" d="M3 12a9 9 0 1 1 18 0a9 9 0 0 1-18 0"/>
                    <circle cx="12" cy="10" r="4" fill="#b89494"/>
                    <path fill="#b89494" fillRule="evenodd" d="M18.22 18.246c.06.097.041.22-.04.297A8.97 8.97 0 0 1 12 21a8.97 8.97 0 0 1-6.18-2.457a.24.24 0 0 1-.04-.297C6.942 16.318 9.291 15 12 15s5.057 1.318 6.22 3.246" clipRule="evenodd"/>
                  </svg>
                </Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-blue-500">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signup" className="text-gray-600 hover:text-blue-500">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>

    {/* Sidebar for Mobile */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 z-0"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}
    <aside
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="px-4 py-6">
        <Link to="/" className="block text-gray-800 hover:text-blue-500 py-2">
          Novels
        </Link>
        <Link to="/NonFiction" className="block text-gray-800 hover:text-blue-500 py-2">
          Non-Fiction
        </Link>
        <Link to="/Articles" className="block text-gray-800 hover:text-blue-500 py-2">
          Articles
        </Link>
      </div>
    </aside>
  </>
  );
};

Navbar.propTypes = {
  setAuth: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Navbar;







import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Contact from "../contact/Contact";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAdminInfo = async () => {
      if (isLoggedIn) {
        const email = localStorage.getItem("currentUserEmail");
        console.log(email);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/auth/${email}`, {
          method: 'GET'
        });
        const status = await res.json();
        if (status.isAdmin) setAdmin(true);
        console.log(status.isAdmin);
      }
    };
    getAdminInfo();
  }, [isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-orange-500 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-bold text-white">
          <Link to="/">CompanionConnect</Link>
        </h1>

        <button
          className="custom-md:hidden text-white"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ul className="hidden custom-md:flex space-x-6">
          <li>
            <Link to="/home" className="text-white hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/adoption" className="text-white hover:text-gray-200">
              Give For Adoption
            </Link>
          </li>
          <li>
            <button
              className="text-white hover:text-gray-200"
              onClick={() => setIsContactOpen(true)}
            >
              Contact
            </button>
          </li>
          <li>
            {isAdmin && (
              <Link to="/admin" className="text-white hover:text-gray-200">
                Admin Page
              </Link>
            )}
          </li>
          <li>
            <button
              className="bg-white text-orange-500 py-1 px-4 rounded hover:bg-gray-200"
              onClick={handleAuth}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>

      {isNavOpen && (
  <ul className="custom-md:hidden bg-orange-500 shadow-md">
    <li className="border-b border-orange-300 text-center">
      <Link
        to="/home"
        className="block py-2 text-white hover:text-orange-200"
        onClick={() => setIsNavOpen(false)}
      >
        Home
      </Link>
    </li>
    <li className="border-b border-orange-300 text-center">
      <Link
        to="/adoption"
        className="block py-2 text-white hover:text-orange-200"
        onClick={() => setIsNavOpen(false)}
      >
        Give For Adoption
      </Link>
    </li>
    <li className="border-b border-orange-300 text-center">
      <button
        className="block py-2 text-white hover:text-orange-200 w-full"
        onClick={() => {
          setIsNavOpen(false);
          setIsContactOpen(true);
        }}
      >
        Contact
      </button>
    </li>
    <li className="border-b border-orange-300 text-center">
      {isAdmin && (
        <Link
          to="/admin"
          className="block py-2 text-white hover:text-orange-200"
          onClick={() => setIsNavOpen(false)}
        >
          Admin Page
        </Link>
      )}
    </li>

    <li className="text-center border-t border-orange-300">
      <button
        className="block py-2 text-white hover:text-orange-200 w-full"
        onClick={() => {
          handleAuth();
          setIsNavOpen(false);
        }}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </li>
  </ul>
)}

      <Contact
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </nav>
  );
};

export default Navbar;

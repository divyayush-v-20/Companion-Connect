import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="bg-orange-500 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-bold text-white">
          <Link to="/">CompanionConnect</Link>
        </h1>

        <button
          className="md:hidden text-white"
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

        <ul className="hidden md:flex space-x-8">
          {["home", "about", "featured", "testimonials", "contact"].map(
            (section) => (
              <li key={section}>
                <ScrollLink
                  to={section}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer text-white hover:text-orange-200"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </ScrollLink>
              </li>
            )
          )}
          <li>
            {user ? (
              <button
                onClick={onLogout}
                className="cursor-pointer text-white hover:text-orange-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="cursor-pointer text-white hover:text-orange-200"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>

      {isNavOpen && (
        <ul className="md:hidden bg-orange-500 shadow-md">
          {["home", "about", "featured", "testimonials", "contact"].map(
            (section) => (
              <li
                key={section}
                className="border-b border-orange-300 text-center"
              >
                <ScrollLink
                  to={section}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsNavOpen(false)}
                  className="block py-2 text-white hover:text-orange-200"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </ScrollLink>
              </li>
            )
          )}
          <li className="text-center border-t border-orange-300">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setIsNavOpen(false);
                }}
                className="block py-2 text-white hover:text-orange-200 w-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsNavOpen(false)}
                className="block py-2 text-white hover:text-orange-200 w-full"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

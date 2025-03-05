import { Link } from "react-router-dom";
import LogoutButton from "./common/LogoutButton";
import { useAuthContext } from "../context/AuthContext";
import NavSearch from "./common/NavSearch.jsx";
import { useState } from "react";

function Navbar() {
  const { authUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 fixed w-full z-50 top-0 left-0 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              className="flex items-center text-white hover:text-gray-300"
              to="/"
            >
              <i className="fa-solid fa-film text-2xl mr-2"></i>
              <span className="text-xl font-semibold">My Movies</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              to="/"
            >
              Popular
            </Link>
            <Link
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              to="/favorites"
            >
              Favorites
            </Link>
            <NavSearch />
            <div className="flex items-center space-x-2">
              {!authUser ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i>Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600"
                  >
                    <i className="fas fa-user-plus mr-2"></i>Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600"
                  >
                    <i className="fas fa-user mr-2"></i>Profile
                  </Link>
                  <LogoutButton />
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <i className="fas fa-bars text-xl"></i>
              ) : (
                <i className="fas fa-times text-xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-900`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => {
              updateQuery("");
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Popular
          </Link>
          <Link
            to="/favorites"
            onClick={() => {
              updateQuery("");
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Favorites
          </Link>
          <div className="py-2">
            <NavSearch />
          </div>
          <div className="space-y-2">
            {!authUser ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border border-gray-700"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border border-gray-700"
                >
                  <i className="fas fa-user-plus mr-2"></i>Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border border-gray-700"
                >
                  <i className="fas fa-user mr-2"></i>Profile
                </Link>
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

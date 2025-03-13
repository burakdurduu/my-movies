import { Link } from "react-router-dom";
import LogoutButton from "./common/LogoutButton";
import { useAuthContext } from "../context/AuthContext";
import NavSearch from "./common/NavSearch.jsx";
import { useState } from "react";
import { Film, Menu } from "lucide-react";

function Navbar() {
  const { authUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 fixed w-full z-50 top-0 left-0 border-b border-gray-800">
      <div className="flex justify-between h-16 mx-7">
        <div className="flex items-center">
          <Link
            className="flex items-center text-white hover:text-gray-300"
            to="/"
          >
            <Film className="size-5 mr-2 text-yellow-500" />
            <span className="text-xl font-semibold text-yellow-500">
              My Movies
            </span>
          </Link>
          <div className="hidden md:flex items-center ml-3">
            <Link
              className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
              to="/"
            >
              Popular
            </Link>
            <Link
              className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
              to="/favorites"
            >
              Favorites
            </Link>
          </div>
          <div>
            <NavSearch />
          </div>
          <div className="hidden md:flex items-center justify-center text-center space-x-2 absolute right-0 mr-4">
            {!authUser ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-yellow-500 px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:text-yellow-500 px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-yellow-500 px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600"
                >
                  Profile
                </Link>
                <LogoutButton />
              </>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center focus:outline-none focus:ring-0 focus-visible:outline-none">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-yellow-500 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? <Menu /> : "X"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-900`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => {
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Popular
          </Link>
          <Link
            to="/favorites"
            onClick={() => {
              setIsOpen(false);
            }}
            className="text-gray-300 hover:text-yellow-500 block px-3 py-2 rounded-md text-base font-medium"
          >
            Favorites
          </Link>
          <div className="space-y-2">
            {!authUser ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-yellow-500 block px-3 py-2 rounded-md text-base text-center font-medium border border-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-yellow-500 block px-3 py-2 rounded-md text-base text-center font-medium border border-gray-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border border-gray-700"
                >
                  Profile
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

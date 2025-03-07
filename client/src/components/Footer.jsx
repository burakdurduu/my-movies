import { Film } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 py-8 mt-20 w-full">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <Link
            to="https://www.instagram.com"
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
          >
            <i className="fab fa-instagram text-xl"></i>
          </Link>
          <Link
            to="https://www.github.com"
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
          >
            <i className="fa-brands fa-github text-xl"></i>
          </Link>
          <Link
            to="https://www.linkedin.com"
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </Link>
          <Link
            to="https://www.x.com"
            className="text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
          >
            <i className="fa-brands fa-x-twitter text-xl"></i>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-gray-400 text-sm">
            © 2025 Burak Durdu |{" "}
            <Link
              to="https://www.themoviedb.org/"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              TMDB{" "}
            </Link>
            •{" "}
            <Link
              to="https://tailwindcss.com/"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Tailwind CSS{" "}
            </Link>
            •{" "}
            <Link
              to="https://fontawesome.com/"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Font Awesome{" "}
            </Link>
          </div>
          <p className="text-yellow-500 text-sm mt-2 flex items-center">
            <Film className="size-4 mr-2" /> MM
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

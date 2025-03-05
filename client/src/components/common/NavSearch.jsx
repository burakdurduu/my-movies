import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const NavSearch = () => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/?q=${encodeURIComponent(value.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form className="flex-1 max-w-sm mx-4" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className="w-full bg-gray-700 text-white rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          type="search"
          name="movie_name"
          placeholder="Search movies..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-yellow-500 transition-colors duration-300"
          type="submit"
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default NavSearch;

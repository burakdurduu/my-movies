import { useState } from "react";
import { useSearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const NavSearch = () => {
  const { updateQuery } = useSearchContext();
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuery(value);
    setValue("");
    navigate("/");
  };
  return (
    <form className="d-flex search-form me-3" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          className="form-control search-input"
          type="search"
          name="movie_name"
          placeholder="Search movies..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button className="btn search-btn" type="submit">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default NavSearch;

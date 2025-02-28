import { Link } from "react-router-dom";
import LogoutButton from "./common/LogoutButton";
import { useAuthContext } from "../context/AuthContext";
import NavSearch from "./common/navSearch";
import { useSearchContext } from "../context/SearchContext";

function Navbar() {
  const { authUser } = useAuthContext();
  const { updateQuery } = useSearchContext();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={() => updateQuery("")}>
          <i className="fa-solid fa-film"></i>
          <span>My Movies</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => updateQuery("")}>
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/favorites"
                onClick={() => updateQuery("")}
              >
                Favorites
              </Link>
            </li>
          </ul>
          <NavSearch />
          <div className="nav-buttons">
            {!authUser ? (
              <>
                <Link to="/login" className="btn nav-btn">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
                <Link to="/signup" className="btn nav-btn">
                  <i className="fas fa-user-plus"></i> Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn nav-btn">
                  <i className="fas fa-user"></i> Profile
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

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
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
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/popular">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>

          <form className="d-flex search-form me-3">
            <div className="input-group">
              <input
                className="form-control search-input"
                type="search"
                name="movie_name"
                placeholder="Search movies..."
                required
              />
              <button className="btn search-btn" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
          <div className="nav-buttons">
            <Link to="/login" className="btn nav-btn">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
            <Link to="/register" className="btn nav-btn">
              <i className="fas fa-user-plus"></i> Register
            </Link>
            <Link to="/profile" className="btn nav-btn">
              <i className="fas fa-user"></i> Profile
            </Link>
            <Link to="/logout" className="btn nav-btn">
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;

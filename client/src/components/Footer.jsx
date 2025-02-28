import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="container text-center">
        <div className="social-icons mb-4">
          <Link to="https://www.instagram.com" className="text-gold">
            <i className="fab fa-instagram fa-lg"></i>
          </Link>
          <Link to="https://www.github.com" className="text-gold">
            <i className="fa-brands fa-github"></i>
          </Link>
          <Link to="https://www.linkedin.com" className="text-gold">
            <i className="fab fa-linkedin fa-lg"></i>
          </Link>
          <Link to="https://www.x.com" className="text-gold">
            <i className="fa-brands fa-x-twitter"></i>
          </Link>
        </div>

        <div className="row justify-content-center">
          <div className="text-light small mb-0">
            © 2025 Burak Durdu |{" "}
            <Link to="https://www.themoviedb.org/" className="text-light">
              TMDB{" "}
            </Link>
            •{" "}
            <Link to="https://getbootstrap.com/" className="text-light">
              Bootstrap{" "}
            </Link>
            •{" "}
            <Link to="https://fontawesome.com/" className="text-light">
              Font Awesome{" "}
            </Link>
          </div>
          <p className="text-gold small mt-1">
            <i className="fa-solid fa-film"> MM</i>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

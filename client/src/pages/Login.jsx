import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs.email, inputs.password);
  };

  return (
    <div className="container auth-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card auth-card shadow-lg">
            <div className="card-body p-5">
              <h1 className="text-center mb-4 auth-title">Welcome Back</h1>
              <p className="text-center mb-4 auth-subtitle">
                Your Collection Awaits 🍿
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 auth-input-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      name="username"
                      id="email"
                      value={inputs.email}
                      placeholder="Enter your email"
                      autoComplete="off"
                      required
                      onChange={(e) =>
                        setInputs({ ...inputs, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="form-group mb-4 auth-input-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      value={inputs.password}
                      placeholder="Enter your password"
                      autoComplete="off"
                      required
                      onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn auth-btn w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                <div className="text-center auth-divider">
                  <a
                    className="btn btn-outline-light btn-block"
                    href="/auth/google"
                    role="button"
                  >
                    <img
                      className="fab me-2"
                      src="images/google-icon.png"
                      alt="google-icon"
                    />
                    Sign in with Google
                  </a>
                </div>
              </form>

              <div className="text-center mt-3 auth-footer">
                <p className="mb-0">
                  Don`t have an account? <Link to="/signup">Sing Up now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

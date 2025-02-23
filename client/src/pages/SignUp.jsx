import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSingUp = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container register-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card register-card shadow-lg">
              <div className="card-body p-5">
                <h1 className="text-center mb-4 register-title">
                  Create Account
                </h1>
                <p className="text-center mb-4 register-subtitle">
                  Start Your Movie Journey 🍿
                </p>

                <form onSubmit={handleSingUp}>
                  <div className="form-group mb-3 register-input-group">
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
                        value={email}
                        placeholder="Enter your email"
                        autoComplete="off"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4 register-input-group">
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
                        value={password}
                        placeholder="Create a password"
                        autoComplete="off"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-danger w-100 mb-3 register-btn"
                  >
                    Sign Up
                  </button>
                  <div className="text-center register-divider">
                    <a
                      className="btn btn-outline-light btn-block"
                      href="/auth/google"
                      role="button"
                    >
                      <img
                        className="fab me-2"
                        src="images/google-icon.png"
                        alt="google-icon"
                      />{" "}
                      Sign up with Google
                    </a>
                  </div>
                </form>

                <div className="text-center mt-3 register-footer">
                  <p className="mb-0">
                    Already have an account? <Link to="/login">Login here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

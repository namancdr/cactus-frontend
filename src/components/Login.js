import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import { Link } from "react-router-dom";
import bigLogo from "../assets/big-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginUser(formData);
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center">
      <img src={bigLogo} alt="Cactus" className="mb-4" />
      <form onSubmit={handleSubmit} className="login-form mt-2">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={email}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
            placeholder="Password"
            required
          />
        </div>
        <div className="d-grid my-4">
          <button type="submit" className="btn btn-primary">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
      <p>
        Don't have an account ? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

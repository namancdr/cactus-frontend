import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";
import { Link } from "react-router-dom";
import bigLogo from "../assets/big-logo.png";

const Signup = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false)
  const { name, email, username, password, cpassword } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (cpassword === password) {
      await createUser(formData);
      setLoading(false)
      navigate("/");
    } else {
      console.log("Password do not match!");
      setLoading(false)
    }
  };

  return (
    <div className="login-container d-flex flex-column align-items-center justify-content-center">
      <img src={bigLogo} alt="Cactus" className="mb-4" />

      <form onSubmit={handleSubmit} className="login-form mt-2">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="name"
            value={name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            aria-describedby="username"
            value={username}
            onChange={handleChange}
            placeholder="Choose a unique Username"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            id="cpassword"
            name="cpassword"
            value={cpassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-grid my-4">
          <button type="submit" className="btn btn-primary">
          {loading 
          ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          : 'Signup'
        }
          </button>
        </div>
      </form>
      <p>
        Don't have an account ? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

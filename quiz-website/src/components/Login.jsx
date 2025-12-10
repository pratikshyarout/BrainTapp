import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f1c2c, #928dab)",
    color: "white",
  };

  const formStyle = {
    backgroundColor: "#2b2b2b",
    padding: "40px",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  };

  const btnStyle = {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    backgroundColor: "#00bfff",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          style={btnStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0096c7")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#00bfff")}
          type="submit"
        >
          Login
        </button>
        <p style={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#00bfff", textDecoration: "none" }}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

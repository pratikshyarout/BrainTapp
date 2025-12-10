import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
      });

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #141E30, #243B55)",
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
      <form style={formStyle} onSubmit={handleSignup}>
        <h2>Signup</h2>
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
        <input
          style={inputStyle}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          style={btnStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0096c7")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#00bfff")}
          type="submit"
        >
          Signup
        </button>
        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#00bfff", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

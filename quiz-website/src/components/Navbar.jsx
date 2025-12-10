import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navbarStyle = {
    backgroundColor: "#222",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    flexWrap: "wrap",
  };

  const logoStyle = {
    fontSize: "1.6rem",
    fontWeight: "bold",
    color: "#00bfff",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "500",
    transition: "0.3s",
  };

  const activeHover = (e, color) => {
    e.target.style.color = color;
  };

  const buttonStyle = {
    background: "#00bfff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 15px",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <nav style={navbarStyle}>
      <h2 style={logoStyle}>QuizMaster</h2>

      <ul style={navLinksStyle}>
        {/* Always visible */}
        <li>
          <Link
            to="/"
            style={linkStyle}
            onMouseEnter={(e) => activeHover(e, "#00bfff")}
            onMouseLeave={(e) => activeHover(e, "white")}
          >
            Home
          </Link>
        </li>

        {/* Show only if user is logged in */}
        {user && (
          <>
            <li>
              <Link
                to="/dashboard"
                style={linkStyle}
                onMouseEnter={(e) => activeHover(e, "#00bfff")}
                onMouseLeave={(e) => activeHover(e, "white")}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/quiz"
                style={linkStyle}
                onMouseEnter={(e) => activeHover(e, "#00bfff")}
                onMouseLeave={(e) => activeHover(e, "white")}
              >
                Quiz
              </Link>
            </li>
          </>
        )}

        {/* Show Login/Signup if user is not logged in */}
        {!user ? (
          <>
            <li>
              <Link
                to="/login"
                style={linkStyle}
                onMouseEnter={(e) => activeHover(e, "#00bfff")}
                onMouseLeave={(e) => activeHover(e, "white")}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                style={linkStyle}
                onMouseEnter={(e) => activeHover(e, "#00bfff")}
                onMouseLeave={(e) => activeHover(e, "white")}
              >
                Signup
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={logout}
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.background = "#0096c7")}
              onMouseLeave={(e) => (e.target.style.background = "#00bfff")}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

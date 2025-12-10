import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const containerStyle = {
    background: "linear-gradient(135deg, #1f1c2c, #928dab)",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    flexDirection: "column",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    marginBottom: "10px",
  };

  const spanStyle = {
    color: "#00bfff",
  };

  const btnStyle = {
    marginTop: "20px",
    padding: "12px 25px",
    backgroundColor: "#00bfff",
    border: "none",
    color: "white",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        Welcome to <span style={spanStyle}>QuizMaster</span> 🧠
      </h1>
      <p>Test your knowledge and challenge yourself with fun quizzes!</p>
      <button
        style={btnStyle}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0096c7")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#00bfff")}
        onClick={() => navigate("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;

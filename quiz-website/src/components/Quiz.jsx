import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Quiz = () => {
  const { user } = useContext(AuthContext);

  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "HighText Machine Language",
      ],
      correct: 0,
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      correct: 2,
    },
    {
      question: "Which is not a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Django"],
      correct: 3,
    },
    {
      question: "Which tag is used for inserting a line break in HTML?",
      options: ["<break>", "<br>", "<lb>", "<line>"],
      correct: 1,
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (index) => {
    const newSelected = [...selected];
    newSelected[currentQ] = index;
    setSelected(newSelected);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const handleSubmit = async () => {
    const finalScore = selected.filter(
      (ans, idx) => ans === questions[idx].correct
    ).length;
    setScore(finalScore);
    setSubmitted(true);

    // Save result to Firestore
    try {
      await addDoc(collection(db, "results"), {
        uid: user.uid,
        email: user.email,
        quizTitle: "General Knowledge Quiz",
        score: finalScore,
        total: questions.length,
        timestamp: serverTimestamp(),
      });
      console.log("Result saved successfully!");
    } catch (err) {
      console.error("Error saving result:", err);
    }
  };

  // === Inline Styles ===
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #232526, #414345)",
    color: "white",
    textAlign: "center",
    padding: "20px",
  };

  const questionBoxStyle = {
    backgroundColor: "#2c2c2c",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
    width: "80%",
    maxWidth: "600px",
  };

  const optionStyle = (isSelected) => ({
    backgroundColor: isSelected ? "#00bfff" : "#444",
    color: "white",
    border: "none",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    transition: "0.3s",
  });

  const navBtnStyle = {
    margin: "20px 10px 0 10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#00bfff",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  };

  const progressStyle = {
    marginTop: "15px",
    color: "#00bfff",
  };

  return (
    <div style={containerStyle}>
      {!submitted ? (
        <div style={questionBoxStyle}>
          <h2>
            Question {currentQ + 1} of {questions.length}
          </h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            {questions[currentQ].question}
          </p>

          {questions[currentQ].options.map((opt, i) => (
            <button
              key={i}
              style={optionStyle(selected[currentQ] === i)}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          ))}

          <div style={{ marginTop: "20px" }}>
            {currentQ > 0 && (
              <button style={navBtnStyle} onClick={handlePrev}>
                Previous
              </button>
            )}
            {currentQ < questions.length - 1 ? (
              <button style={navBtnStyle} onClick={handleNext}>
                Next
              </button>
            ) : (
              <button style={navBtnStyle} onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>

          <p style={progressStyle}>
            Progress: {currentQ + 1}/{questions.length}
          </p>
        </div>
      ) : (
        <div style={questionBoxStyle}>
          <h2>Quiz Completed 🎉</h2>
          <p style={{ fontSize: "1.3rem" }}>
            Your Score: {score} / {questions.length}
          </p>
          <p>Your result has been saved to the dashboard ✅</p>
          <button
            style={navBtnStyle}
            onClick={() => {
              setSubmitted(false);
              setSelected(Array(questions.length).fill(null));
              setCurrentQ(0);
              setScore(0);
            }}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;

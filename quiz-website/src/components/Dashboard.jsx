import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!user) return;

    // fetch quiz results of current user
    const fetchResults = async () => {
      try {
        const q = query(collection(db, "results"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, [user]);

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #232526, #414345)",
    color: "white",
    padding: "30px",
  };

  const cardStyle = {
    backgroundColor: "#2b2b2b",
    padding: "25px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
    textAlign: "center",
    width: "80%",
    maxWidth: "500px",
  };

  const resultBox = {
    backgroundColor: "#333",
    borderRadius: "8px",
    padding: "12px",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Welcome, {user?.email} 👋</h2>
        <p>Your quiz history:</p>

        {results.length > 0 ? (
          results.map((r) => (
            <div key={r.id} style={resultBox}>
              <p>
                <strong>Quiz:</strong> {r.quizTitle || "General Quiz"}
              </p>
              <p>
                <strong>Score:</strong> {r.score}/{r.total}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {r.timestamp
                  ? new Date(r.timestamp.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "15px" }}>No results yet — take a quiz!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

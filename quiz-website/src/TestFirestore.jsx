import React from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const TestFirestore = () => {
  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "testCollection"), {
        name: "Priyansu",
        role: "Tester",
        timestamp: new Date(),
      });
      alert("✅ Firestore connected successfully!");
    } catch (err) {
      alert("❌ Firestore Error: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Firestore Connection Test</h2>
      <button
        style={{
          padding: "12px 25px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#00bfff",
          color: "white",
          cursor: "pointer",
        }}
        onClick={handleAdd}
      >
        Test Firestore
      </button>
    </div>
  );
};

export default TestFirestore;

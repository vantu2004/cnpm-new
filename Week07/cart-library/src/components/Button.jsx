import React from "react";

export const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

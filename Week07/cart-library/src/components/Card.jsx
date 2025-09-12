import React from "react";

export const Card = ({ title, children }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        margin: "8px 0",
      }}
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

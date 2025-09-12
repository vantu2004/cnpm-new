import React from "react";

export const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  );
};

import React from "react";

const Button = ({ text, wfull, onClick, variant, color }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded ${
        variant == "outlined" ? "border--button--outlined" : "button-filled"
      }
      ${color == "green" ? 'green-button' : 'yellow-button'}
      ${wfull ? "w-full" : ""} `}
    >
      {text}
    </button>
  );
};

export default Button;

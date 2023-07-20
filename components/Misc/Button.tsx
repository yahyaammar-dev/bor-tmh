import React from "react";

const Button = ({ text, wfull, onClick, variant }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded ${
        variant == "outlined" ? "border--button--outlined" : "button-filled"
      }  ${wfull ? "w-full" : ""} `}
    >
      {text}
    </button>
  );
};

export default Button;

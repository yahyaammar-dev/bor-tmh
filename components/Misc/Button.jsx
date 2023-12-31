import React from "react";

const Button = ({
  text,
  wfull,
  onClick,
  variant,
  color,
  disableded,
  width = null,
}) => {
  return (
    <button
      disabled={disableded}
      onClick={onClick}
      className={`px-2 sm:px-5 py-2 text-sm sm:text-base rounded ${
        variant == "outlined" ? "border--button--outlined" : "button-filled"
      }
      ${color == "green" ? "green-button" : "yellow-button"}
      ${color == "black" ? "black-button" : "yellow-button"}
      ${wfull ? "w-full" : ""} 
      ${disableded ? "cursor-not-allowed dark" : ""}
      ${width != null ? width : ""}
      `}
    >
      {text}
    </button>
  );
};

export default Button;

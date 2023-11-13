import React from "react";

const Button = ({ text, wfull, onClick, variant, color, disableded }) => {
  return (
    <button
      disabled={disableded}
      onClick={onClick}
      className={`px-5 py-2 rounded ${variant == "outlined" ? "border--button--outlined" : "button-filled"
        }
      ${color == "green" ? 'green-button' : 'yellow-button'}
      ${color == "black" ? 'black-button' : 'yellow-button'}
      ${wfull ? "w-full" : ""} 
      ${disableded ? "cursor-not-allowed dark": ""}
      `}

    >
      {text}
    </button>
  );
};

export default Button;

import React from "react";
import "../../style/components/ui/Button.scss";

function Button({ text, bgColor, color, icon, border, onClick, fontSize }) {
  return (
    <button
      onClick={onClick}
      className="Button"
      style={{
        background: bgColor,
        color: color,
        border: border,
        fontSize: fontSize,
      }}
    >
      <p>{text}</p>
      {icon && <p className="icon">{icon}</p>}
    </button>
  );
}

export default Button;

import React from "react";
import "./Input.scss";

const defaultChange = () => {};

function Input({ onRef, ...props }) {
  const { id, label = "", onChange = defaultChange, className } = props;

  return (
    <div
      className={`input ${className || ""} ${!label ? "input--inline" : ""}`}
    >
      <label htmlFor={id} className="input__label">
        {label}
      </label>

      <input
        {...props}
        autoComplete="off"
        ref={onRef}
        onChange={event => onChange(event.target.value, { event })}
        className="input__element"
      />
    </div>
  );
}

export default Input;

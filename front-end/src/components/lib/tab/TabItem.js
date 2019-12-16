import React from "react";
import "./Tab.scss";
import Spinner from "../spinner/Spinner";

function getClassNames(props) {
  const classNames = ["tab__item"];

  if (props.loading) classNames.push("tab__item--loading");
  if (props.active) classNames.push("tab__item--active");
  if (props.disabled) classNames.push("tab__item--disabled");

  return classNames.join(" ");
}

function Button(props) {
  const {
    tabIndex,
    disabled,
    style,
    loading,
    label,
    name,
    onClick,
    active
  } = props;

  return (
    <li
      tabIndex={tabIndex || (active || disabled ? null : "0")}
      onKeyUp={event =>
        event.keyCode === 13 && !disabled && !active && onClick(label, event)
      }
      onClick={event => !disabled && !active && onClick(label, event)}
      disabled={disabled}
      style={style}
      name={name}
      className={getClassNames(props)}
    >
      {loading && <Spinner small />}
      {label && <span className="button__label">{label}</span>}
    </li>
  );
}

export default Button;

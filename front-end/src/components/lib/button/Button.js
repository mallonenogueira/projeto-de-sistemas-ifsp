import React from "react";
import "./Button.scss";
import Spinner from "../spinner/Spinner";

function getClassNames(props) {
  const classNames = ["button"];

  if (props.small) classNames.push("button--small");
  if (props.primary) classNames.push("button--primary");
  if (props.secondary) classNames.push("button--secondary");
  if (props.block) classNames.push("button--block");
  if (props.loading) classNames.push("button--loading");
  if (props.transparent) classNames.push("button--transparent");
  if (props.big) classNames.push("button--big");

  return classNames.join(" ");
}

function Button(props) {
  const {
    disabled,
    type,
    style,
    loading,
    children,
    icon,
    label,
    name,
    onClick,
    tabIndex
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      name={name}
      tabIndex={tabIndex}
      className={getClassNames(props)}
    >
      {loading && <Spinner small />}
      {icon && !loading && <i className={`button__icon fas fa-fw ${icon}`}></i>}
      {label && <span className="button__label">{label}</span>}
      {children}
    </button>
  );
}

export default Button;

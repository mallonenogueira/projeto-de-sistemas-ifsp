import React from "react";
import "./Card.scss";

function getClassNames(props) {
  const classNames = ["card"];

  if (props.onClick) classNames.push("card--interactive");

  return classNames.join(" ");
}

function Button(props) {
  const { style, children, header, footer, body, onClick } = props;
  const zIndex = onClick ? 0 : null;

  return (
    <section
      tabIndex={zIndex}
      onClick={onClick}
      style={style}
      className={getClassNames(props)}
    >
      <header className="card__header">
        <h3>{header}</h3>
      </header>
      <article className="card__body">{body || children}</article>
      {footer && <footer className="card__footer">{footer}</footer>}
    </section>
  );
}

export default Button;

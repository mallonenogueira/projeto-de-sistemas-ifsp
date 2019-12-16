import React from "react";
import "./Spinner.scss";

function Spinner({ small }) {
  const classNames = `spinner ${small ? "spinner--small" : ""}`;

  return <div className={classNames}></div>;
}

export default Spinner;

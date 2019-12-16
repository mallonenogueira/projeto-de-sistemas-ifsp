import React from "react";

const Dropdown = props => (
  <ul className="dropdown" {...props}>
    {props.children}
  </ul>
);

export default Dropdown;

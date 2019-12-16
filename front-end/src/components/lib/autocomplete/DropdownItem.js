import React from "react";

const DropdownItem = props => (
  <li className="dropdown__item" {...props}>
    {props.children}
  </li>
);

export default DropdownItem;

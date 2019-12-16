import React from "react";

const DropdownWrapper = ({ onRef, ...props }) => (
  <div ref={onRef} className="dropdown__wrapper" {...props}>
    {props.children}
  </div>
);

export default DropdownWrapper;

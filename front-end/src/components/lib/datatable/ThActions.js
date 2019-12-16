import React from "react";

function ThActions({ rowActions }) {
  if (!rowActions) {
    return null;
  }

  return <th className="datatable__th datatable__th--actions"></th>;
}

export default ThActions;

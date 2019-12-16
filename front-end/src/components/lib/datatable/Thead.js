import React from "react";
import Tr from "./Tr";

function Thead({ columns, rowActions }) {
  if (!columns || !columns.length) {
    return null;
  }

  return (
    <thead className="datatable__head">
      <Tr isHead columns={columns} rowActions={rowActions} />
    </thead>
  );
}

export default Thead;

import React from "react";
import Tr from "./Tr";

function Table({ columns, rows, id, rowActions, selectedId }) {
  if (!columns || !columns.length) {
    return null;
  }

  return (
    <tbody className="datatable__body">
      {rows.map((row, index) => (
        <Tr
          selected={id ? row[id] === selectedId : false}
          key={id ? row[id] : index}
          columns={columns}
          data={row}
          rowActions={rowActions}
        />
      ))}
    </tbody>
  );
}

export default Table;

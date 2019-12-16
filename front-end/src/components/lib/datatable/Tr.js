import React from "react";
import TdActions from "./TdActions";
import ThActions from "./ThActions";

function Tr({ columns, isHead, data, id, rowActions, selected }) {
  if (!columns || !columns.length) {
    return null;
  }

  if (isHead) {
    return (
      <tr className="datatable__row">
        {columns.map(column => (
          <th
            key={column.name}
            className="datatable__th"
            style={{ width: column.width }}
          >
            {column.name}
          </th>
        ))}

        <ThActions rowActions={rowActions} />
      </tr>
    );
  }

  return (
    <tr
      className={`datatable__row ${selected ? "datatable__row--selected" : ""}`}
    >
      {columns.map((column, index) => (
        <td
          key={id ? data[id] : index}
          className="datatable__td"
          style={{ width: column.width }}
        >
          {column.format
            ? column.format(data[column.field], { column, row: data })
            : data[column.field]}
        </td>
      ))}

      <TdActions rowActions={rowActions} data={data} />
    </tr>
  );
}

export default Tr;

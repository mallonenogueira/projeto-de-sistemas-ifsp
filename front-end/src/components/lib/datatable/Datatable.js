import React from "react";
import "./Datatable.scss";
import Thead from "./Thead";
import Tbody from "./Tbody";

function Datatable(props) {
  const { rows, columns, rowActions, id, selectedId } = props;

  return (
    <div className="datatable">
      <table className="datatable__element">
        <Thead columns={columns} rowActions={rowActions} />
        <Tbody
          columns={columns}
          rows={rows}
          rowActions={rowActions}
          id={id}
          selectedId={selectedId}
        />
      </table>
    </div>
  );
}

export default Datatable;

import React from "react";

import Table from "../lib/datatable/Datatable";
import Button from "../lib/button/Button";
import FullSpinner from "../lib/spinner/FullSpinner";
import format from "../lib/format-date";

const columns = [
  {
    field: "id",
    name: "Código"
  },
  {
    field: "date",
    name: "Data",
    format
  },
  {
    field: "name",
    name: "Descrição"
  }
];

function Agility(props) {
  const { data, isLoading, onEdit, onCreate, onDelete } = props;

  return (
    <div className="crud">
      <header className="crud__header ">
        <div className="row u-verticalCenter">
          <div className="col-4">
            <span style={{ marginLeft: 10 }}>Testes de agilidade</span>
          </div>

          <div className="col-8 u-horizontalRight ">
            <Button
              primary
              label="Novo teste"
              icon="fa-plus"
              onClick={onCreate}
            />
          </div>
        </div>
      </header>

      <div className="crud__content">
        {isLoading && <FullSpinner />}

        {!isLoading && (
          <Table
            columns={columns}
            rows={data}
            id="id"
            rowActions={{
              pen: {
                action: onEdit
              },
              trash: {
                loadingValue: "removing",
                action: onDelete
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Agility;

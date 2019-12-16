import React from "react";

import Table from "../lib/datatable/Datatable";
import Button from "../lib/button/Button";
import FullSpinner from "../lib/spinner/FullSpinner";

const columns = [
  {
    field: "id",
    name: "Código"
  },
  {
    field: "name",
    name: "Atleta"
  },
  {
    field: "nickname",
    name: "Apelido"
  },
  {
    field: "email",
    name: "Email"
  },
  {
    field: "phone",
    name: "Telefone"
  },
  {
    field: "team",
    name: "Time"
  }
];

function Athlete(props) {
  const { athletes, isLoading, onEdit, onCreate, onDelete } = props;

  return (
    <div className="crud">
      <header className="crud__header ">
        <div className="row u-verticalCenter">
          <div className="col-4">
            <span style={{ marginLeft: 10 }}>Cadastro de atleta</span>
          </div>

          <div className="col-8 u-horizontalRight ">
            <Button primary label="Atleta" icon="fa-plus" onClick={onCreate} />
          </div>
        </div>
      </header>

      <div className="crud__content">
        {isLoading && <FullSpinner />}

        {!isLoading && (
          <Table
            columns={columns}
            rows={athletes}
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

export default Athlete;

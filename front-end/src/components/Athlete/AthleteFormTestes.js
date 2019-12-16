import React from "react";
import { useDispatch } from "react-redux";

import { fetchOne as fetchRast } from "../../thunks/rast";
import { fetchOne as fetchAgility } from "../../thunks/agility";

import Datatable from "../lib/datatable/Datatable";
import Button from "../lib/button/Button";
import formatDate from "../lib/format-date";

const columns = [
  {
    field: "id",
    name: "Código"
  },
  {
    field: "date",
    name: "Data",
    format: formatDate
  },
  {
    field: "name",
    name: "Descrição"
  },
  {
    field: "tipo",
    name: "Tipo"
  }
];

const getTipo = ({ type }) => {
  if (type === "AGILITY") {
    return "AGILIDADE";
  }

  return type;
};

function AthleteFormTestes({ loading, onCancel, onSave, athlete, history }) {
  const dispatch = useDispatch();

  if (!athlete || !athlete.tests) {
    return null;
  }

  function handleSelected({ row }) {
    if (!row || !row.id || !row.type) return;

    if (row.type === "RAST") {
      dispatch(fetchRast());
      history.push(`/rast/${row.id}`);
    }

    if (row.type === "AGILITY") {
      dispatch(fetchAgility());
      history.push(`/agility/${row.id}`);
    }
  }

  const data = athlete.tests.map(i => ({
    ...i,
    tipo: getTipo(i)
  }));

  return (
    <div className="u-fullPadding formPrincipal">
      <div className="row u-horizontalCenter mt-3">
        <div className="col-md-10">
          <Datatable
            columns={columns}
            rows={data}
            id="id"
            rowActions={{
              eye: {
                action: handleSelected
              }
            }}
          />
        </div>

        <div className="col-md-10 mt-3 u-horizontalRight">
          <Button label="Cancelar" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default AthleteFormTestes;

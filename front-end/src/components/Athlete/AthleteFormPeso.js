import React from "react";

import Datatable from "../lib/datatable/Datatable";
import Button from "../lib/button/Button";
import formatarData from "../lib/format-date";

const columns = [
  {
    field: "createdAt",
    name: "Data",
    format: formatarData
  },
  {
    field: "kilo",
    name: "Peso (Kg)"
  },
  {
    field: "obs",
    name: "Operação"
  }
];

function AthleteFormPeso({ onCancel, athlete }) {
  if (!athlete || !athlete.kilos) {
    return null;
  }

  return (
    <div className="u-fullPadding formPrincipal">
      <div className="row u-horizontalCenter mt-3">
        <div className="col-md-10">
          <Datatable columns={columns} rows={athlete.kilos} id="id" />
        </div>

        <div className="col-md-10 mt-3 u-horizontalRight">
          <Button label="Cancelar" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default AthleteFormPeso;

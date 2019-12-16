import React from "react";
import { useDispatch } from "react-redux";
import { addAthlete, changePeso } from "../../actions/rast";

import Input from "../lib/input/Input";
import Button from "../lib/button/Button";
import Autocomplete from "../lib/autocomplete/Autocomplete";
import Table from "../lib/datatable/Datatable";
import service from "../../services/athlete";

function fetchAthlete(value) {
  return service.list(value).then(({ content }) => content);
}

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
    field: "input",
    name: "Peso (Kg)",
    width: "100px"
  }
];

function RastFormAtletas({ loading, onCancel, onSave, data }) {
  const dispatch = useDispatch();

  if (!data) {
    return null;
  }

  function handleSave() {
    onSave({ ...data });
  }

  const rows = (data.athletes || []).map((row, index) => ({
    ...row,
    input: (
      <Input
        value={row.kilo}
        onChange={value => dispatch(changePeso({ index, kilo: value }))}
      />
    )
  }));

  return (
    <div className="u-fullPadding formPrincipal">
      <div className="row">
        <div className="col-md-10 col-lg-8 mt-2">
          <Autocomplete
            label="Atleta"
            select={null}
            onSelect={athlete => dispatch(addAthlete(athlete))}
            onFetch={fetchAthlete}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 mt-3">
          <Table columns={columns} rows={rows || []} id="id" />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 mt-3 u-horizontalRight">
          <Button
            label="Salvar"
            primary
            loading={loading}
            disabled={loading}
            onClick={handleSave}
          />
          <Button label="Cancelar" disabled={loading} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default RastFormAtletas;

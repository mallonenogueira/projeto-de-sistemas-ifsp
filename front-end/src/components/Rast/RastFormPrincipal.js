import React, { useState } from "react";

import Input from "../lib/input/Input";
import Button from "../lib/button/Button";

const getValue = value => (value !== "" ? value : undefined);

function RastFormPrincipal({ loading, onCancel, onSave, data }) {
  const [name, setName] = useState(data.name || "");
  const [date, setDate] = useState(data.date || "");

  if (!data) {
    return null;
  }

  function handleSave() {
    onSave({
      ...data,
      name: getValue(name),
      date: getValue(date)
    });
  }

  return (
    <div className="u-fullPadding formPrincipal">
      <div className="row u-horizontalCenter">
        <div className="col-md-10 col-lg-8 mt-3">
          <Input label="Descrição" value={name} onChange={v => setName(v)} />
        </div>
      </div>

      <div className="row u-horizontalCenter">
        <div className="col-md-5 col-lg-4 mt-3">
          <Input label="Data" value={date} onChange={v => setDate(v)} />
        </div>
        <div className="col-md-5 col-lg-4 mt-3"></div>
      </div>

      <div className="row u-horizontalCenter mt-3">
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

export default RastFormPrincipal;

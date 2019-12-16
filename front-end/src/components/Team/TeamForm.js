import React, { useState, useEffect } from "react";

import Input from "../lib/input/Input";
import Button from "../lib/button/Button";
import Offcanvas from "../lib/off-canvas/OffCanvas";

function TeamForm({ visible, team, onSubmit, onClose, loading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [current, setCurrent] = useState({});
  const title =
    current && current.id ? `${current.id} - ${current.name}` : "Nova equipe";

  useEffect(() => {
    if (team && team !== current) {
      setCurrent(team);
      setName(team.name || "");
      setDescription(team.description || "");
    }
  }, [team, current, name, description]);

  return (
    <Offcanvas
      open={!!visible}
      header={<span className="u-fullPadding">{title}</span>}
      body={
        team && (
          <div className="u-fullPadding">
            <div className="row">
              <div className="col-12">
                <Input
                  name="nome"
                  label="Nome"
                  value={name}
                  onChange={value => setName(value)}
                />
              </div>

              <div className="col-12 mt-2">
                <Input
                  label="Descrição"
                  value={description}
                  onChange={value => setDescription(value)}
                />
              </div>
            </div>
          </div>
        )
      }
      footer={
        <div className="pl-2 u-flex">
          <Button
            primary
            loading={team && team.loading}
            disabled={team && team.loading}
            label="Salvar"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              onSubmit({ ...current, name, description });
            }}
          />
          <Button label="Fechar" onClick={onClose} />
        </div>
      }
    />
  );
}

export default TeamForm;

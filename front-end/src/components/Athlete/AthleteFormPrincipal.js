import React, { useState } from "react";

import Autocomplete from "../lib/autocomplete/Autocomplete";
import Input from "../lib/input/Input";
import Button from "../lib/button/Button";
import TeamService from "../../services/team";

function fetchTeam(value) {
  return TeamService.list(value).then(({ content }) => content);
}

const getValue = value => (value !== "" ? value : undefined);

function AthleteFormPrincipal({ loading, onCancel, onSave, athlete }) {
  const [name, setName] = useState(athlete.name || "");
  const [nickname, setNickname] = useState(athlete.nickname || "");
  const [phone, setPhone] = useState(athlete.phone || "");
  const [birth, setBirth] = useState(athlete.birth || "");
  const [children, setChild] = useState(athlete.children || "");
  const [email, setEmail] = useState(athlete.email || "");
  const [kilo, setKilo] = useState(athlete.kilo || "");
  const [team, setTeam] = useState(athlete.Team);

  if (!athlete) {
    return null;
  }

  function handleSave() {
    onSave({
      ...athlete,
      name: getValue(name),
      nickname: getValue(nickname),
      phone: getValue(phone),
      birth: getValue(birth),
      children: getValue(children),
      email: getValue(email),
      kilo: getValue(kilo),
      Team: undefined,
      team: team ? team.id : null
    });
  }

  return (
    <div className="u-fullPadding formPrincipal">
      <div className="row u-horizontalCenter">
        <div className="col-md-10 col-lg-8 mt-3">
          <Input label="Nome" value={name} onChange={v => setName(v)} />
        </div>
      </div>

      <div className="row u-horizontalCenter">
        <div className="col-md-10 col-lg-8 mt-3">
          <Input
            label="Apelido"
            value={nickname}
            onChange={v => setNickname(v)}
          />
        </div>
      </div>

      <div className="row u-horizontalCenter">
        <div className="col-md-10 col-lg-8 mt-3">
          <Autocomplete
            label="Equipe"
            select={team}
            onSelect={setTeam}
            onFetch={fetchTeam}
          />
        </div>
      </div>

      <div className="row u-horizontalCenter">
        <div className="col-12 col-md-4 col-lg-3 mt-3">
          <Input
            label="Data de nascimento"
            value={birth}
            onChange={v => setBirth(v)}
          />
        </div>

        <div className="col-12 col-md-4 col-lg-3 mt-3">
          <Input label="Peso (Kg)" value={kilo} onChange={v => setKilo(v)} />
        </div>

        <div className="col-6 col-md-2 col-lg-2 mt-3"></div>
      </div>

      <div className="row u-horizontalCenter">
        <div className="col-md-4 col-lg-3 mt-3">
          <Input label="Telefone" value={phone} onChange={v => setPhone(v)} />
        </div>

        <div className="col-md-6 col-lg-5 mt-3">
          <Input label="E-mail" value={email} onChange={v => setEmail(v)} />
        </div>

        <div className="col-6 col-md-6 col-lg-5 mt-3"></div>
      </div>

      <div className="row u-horizontalCenter mt-3">
        <div className="col-md-10 col-lg-8 mt-3 u-horizontalRight">
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

// <div className="col-4 col-md-2 mt-3">
//   <Input
//     type="checkbox"
//     label="Filhos"
//     value={children}
//     onChange={v => setChild(v)}
//   />
// </div>

export default AthleteFormPrincipal;

import React from "react";
import "./Team.scss";

import TeamForm from "./TeamForm";
import Card from "./../lib/card/Card";
import Button from "./../lib/button/Button";
import FullSpinner from "./../lib/spinner/FullSpinner";

function Team(props) {
  const {
    onClose,
    onSubmit,
    onCreate,
    onEdit,
    onDelete,
    teams,
    isLoading,
    editing,
    loading
  } = props;

  return (
    <div className="crud">
      <TeamForm
        team={editing}
        visible={editing}
        onClose={onClose}
        onSubmit={onSubmit}
      />

      <header className="crud__header ">
        <div className="row u-verticalCenter">
          <div className="col-10">
            <span style={{ marginLeft: 10 }}>Cadastro de equipes</span>
          </div>

          <div className="col-2 u-horizontalRight ">
            <Button primary label="Equipe" icon="fa-plus" onClick={onCreate} />
          </div>
        </div>
      </header>

      <div className="crud__content">
        {isLoading && <FullSpinner />}

        {!isLoading && (
          <ul className="row">
            {teams.map(team => (
              <li key={team.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <Card
                  header={team.name}
                  body={team.description}
                  footer={
                    <div className="u-horizontalRight">
                      <Button
                        small
                        icon="fa-pen"
                        onClick={() => onEdit(team.id)}
                      />
                      <Button
                        small
                        icon="fa-trash"
                        onClick={() => onDelete(team.id)}
                      />
                    </div>
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Team;

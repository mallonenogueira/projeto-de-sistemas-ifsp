import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addResult } from "../../actions/agility";

import Button from "../lib/button/Button";
import Table from "../lib/datatable/Datatable";

const defaultColumns = [
  {
    field: "nickname",
    name: "Atleta"
  }
];

const lastColumns = [
  {
    field: "piorTempo",
    name: "Pior tempo"
  },
  {
    field: "melhorTempo",
    name: "Melhor tempo"
  }
];

function AgilityFormTempos({ loading, onCancel, onSave, data }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  useEffect(() => {
    if (!data) {
      return null;
    }

    let columnNumber = 0;
    const timeColumns = [];
    let newRows = [];

    if (data && data.athletes) {
      newRows = data.athletes.map(athlete => {
        const newRef = {
          ...athlete,
          results: athlete.results || []
        };

        newRef.results.forEach((result, index) => {
          if (index + 1 > columnNumber) {
            columnNumber = index + 1;

            timeColumns.push({
              field: `time-${index}`,
              name: `Tempo ${index + 1}`
            });
          }

          if (!newRef.melhorTempo || result.time < newRef.melhorTempo) {
            newRef.melhorTempo = +result.time;
          }

          if (!newRef.piorTempo || result.time > newRef.piorTempo) {
            newRef.piorTempo = +result.time;
          }

          newRef[`time-${index}`] = +result.time;
          newRef[`id-${index}`] = result.id;
        });

        return newRef;
      });
    }

    setState({
      rows: newRows,
      columns: [...defaultColumns, ...timeColumns, ...lastColumns],
      columnNumber,
      selectedId:
        state.selectedId || (newRows[0] ? newRows[0].inscricaoId : null)
    });
  }, [data]);

  if (!data) {
    return null;
  }

  function handleSave() {
    onSave({ ...data });
  }

  function handleSelected({ row }) {
    setState({
      ...state,
      selectedId: row.inscricaoId
    });
  }

  function handleTimes(times) {
    let find = null;
    const inscricaoId = state.selectedId;

    const next =
      state.rows.find(row => {
        if (row.inscricaoId === inscricaoId) {
          find = true;

          return false;
        }

        return find;
      }) || state.rows[0];

    setState({
      ...state,
      selectedId: next.inscricaoId
    });

    dispatch(
      addResult({
        inscricaoId,
        time: times[0]
      })
    );
  }

  function handleAleatorio() {
    handleTimes([(Math.random() * 60).toFixed(2)]);
  }

  if (window.timesListener) {
    window.timesListener.clear();
    window.timesListener.add(handleTimes);
  }

  return (
    <div className="u-fullPadding formPrincipal">
      <div className="row">
        <div className="col-12 mt-3">
          <Table
            columns={state.columns}
            rows={state.rows || []}
            id="inscricaoId"
            selectedId={state.selectedId}
            rowActions={{
              clock: {
                action: handleSelected
              }
            }}
          />
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
          <Button label="Aleatório" onClick={handleAleatorio} />

          <Button label="Cancelar" disabled={loading} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default AgilityFormTempos;

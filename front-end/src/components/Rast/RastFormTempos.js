import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import jsPDF from "jspdf";

import { addResult } from "../../actions/rast";
import Button from "../lib/button/Button";
import Table from "../lib/datatable/Datatable";

const defaultColumns = [
  {
    field: "nickname",
    name: "Atleta"
  },
  {
    field: "time-1",
    name: "Tempo 1"
  },
  {
    field: "time-2",
    name: "Tempo 2"
  },
  {
    field: "time-3",
    name: "Tempo 3"
  },
  {
    field: "time-4",
    name: "Tempo 4"
  },
  {
    field: "time-5",
    name: "Tempo 5"
  },
  {
    field: "time-6",
    name: "Tempo 6"
  },
  {
    field: "melhorTempo",
    name: "Melhor tempo"
  }
];

function RastFormAtletas({ loading, onCancel, onSave, data }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  useEffect(() => {
    if (!data) {
      return null;
    }

    let newRows = [];

    if (data && data.athletes) {
      newRows = data.athletes.map(athlete => {
        const newRef = {
          ...athlete,
          results: athlete.results || []
        };

        newRef.results.forEach((result, index) => {
          if (!newRef.melhorTempo || result.time < newRef.melhorTempo) {
            newRef.melhorTempo = +result.time;
          }

          newRef[`time-${index + 1}`] = +result.time;
          newRef[`id-${index + 1}`] = result.id;
        });

        return newRef;
      });
    }

    setState({
      rows: newRows,
      columns: defaultColumns,
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

  function handleTime(time) {
    let find = null;
    const inscricaoId = state.selectedId;

    const next =
      state.rows.find(row => {
        if (row.inscricaoId === inscricaoId) {
          if (row.results.length < 6) {
            return true;
          }

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
        time: time
      })
    );
  }

  function handleTimes(times) {
    times.forEach(handleTime);
  }

  function handleAleatorio() {
    handleTime((Math.random() * 60).toFixed(2));
  }

  function download() {
    const jspdf = new jsPDF("p", "pt");
    // const elem = document.querySelector("table");
    // const res = jspdf.autoTableHtmlToJson(elem);
    // doc.autoTable(res.columns, res.data);

    console.log(jspdf.autoTableHtmlToJson);

    jspdf.text(20, 20, "Hello world.");
    jspdf.save("table.pdf");
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
          <Button label="Download" onClick={download} />

          <Button label="Cancelar" disabled={loading} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}

export default RastFormAtletas;

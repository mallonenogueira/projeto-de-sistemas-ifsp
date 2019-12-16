import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "../lib/button/Button";
import Table from "../lib/datatable/Datatable";

const defaultColumns = [
  {
    field: "nickname",
    name: "Apelido"
  },
  {
    field: "kilo",
    name: "Kilo"
  },
  {
    field: "melhorTempo",
    name: "Melhor tempo"
  },
  {
    field: "piorTempo",
    name: "Pior tempo"
  },
  {
    field: "potenciaMaximaWKg",
    name: "Potência máxima (W/kg)"
  },
  {
    field: "potenciaMaxima",
    name: "Potência máxima (W)"
  },
  {
    field: "potenciaMinimaWKg",
    name: "Potência mínima (W/kg)"
  },
  {
    field: "potenciaMinima",
    name: "Potência mínima (W)"
  },
  {
    field: "potenciaMediaWKg",
    name: "Potência média (W/kg)"
  },
  {
    field: "potenciaMedia",
    name: "Potência média (W)"
  },
  {
    field: "fadiga",
    name: "Índice de fadiga (W/s)"
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

          if (!newRef.piorTempo || result.time > newRef.piorTempo) {
            newRef.piorTempo = +result.time;
          }

          newRef[`time-${index + 1}`] = +result.time;
          newRef[`id-${index + 1}`] = result.id;
        });

        return newRef;
      });

      newRows.forEach(row => {
        if (row.melhorTempo) {
          row.potenciaMaximaWKg = (1225 / Math.pow(row.melhorTempo, 3)).toFixed(
            4
          );
        }

        if (row.melhorTempo && row.kilo) {
          row.potenciaMaxima = (row.potenciaMaximaWKg * row.kilo).toFixed(4);
        }

        if (row.melhorTempo) {
          row.potenciaMinimaWKg = (1225 / Math.pow(row.piorTempo, 3)).toFixed(
            4
          );
        }

        if (row.piorTempo && row.kilo) {
          row.potenciaMinima = (row.potenciaMinimaWKg * row.kilo).toFixed(4);
        }

        const potenciaMediaWKg = row.results.reduce(
          (arr, { time }) => 1225 / Math.pow(time, 3) + arr,
          0
        );

        const potenciaMedia = row.results.reduce(
          (arr, { time }) => (1225 / Math.pow(time, 3)) * row.kilo + arr,
          0
        );

        row.potenciaMediaWKg = (potenciaMediaWKg / row.results.length).toFixed(
          4
        );

        row.potenciaMedia = (potenciaMedia / row.results.length).toFixed(4);

        const totalTime = row.results.reduce((arr, { time }) => arr + time, 0);

        row.fadiga = (
          (row.potenciaMaxima - row.potenciaMinima) /
          totalTime
        ).toFixed(4);
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

  return (
    <div className="u-fullPadding formPrincipal">
      <div className="row">
        <div className="col-12 mt-3">
          <Table columns={state.columns} rows={state.rows || []} />
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

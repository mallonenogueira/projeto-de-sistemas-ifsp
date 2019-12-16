import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOne as fetchOneThunk, save } from "../thunks/rast";
import { fetchedOne, fetchOne } from "../actions/rast";

import Tab from "../components/lib/tab/Tab";
import FullSpinner from "../components/lib/spinner/FullSpinner";
import RastFormPrincipal from "../components/Rast/RastFormPrincipal";
import RastFormAtletas from "../components/Rast/RastFormAtletas";
import RastFormTempos from "../components/Rast/RastFormTempos";
import RastFormResultados from "../components/Rast/RastFormResultados";

function RastFormContainer({ match, history }) {
  const { isFetching, isSaving, data } = useSelector(
    state => state.rast.editing
  );
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [active, setActive] = useState("Principal");

  function handleCancel() {
    history.push(`/rast`);
  }

  function handleSave(model) {
    dispatch(save(model));
  }

  useEffect(() => {
    if (!fetched && !isFetching) {
      if (isNaN(match.params.id)) {
        dispatch(fetchOne());

        setTimeout(() => {
          dispatch(fetchedOne({}));
        }, 150);
      } else {
        dispatch(fetchOneThunk(match.params.id));
      }

      setFetched(true);
    }

    if (data) {
      if (isNaN(match.params.id)) {
        setTitle("Novo teste");
      } else {
        setTitle("RAST: " + data.name);
      }
    }
  }, [fetched, dispatch, match.params, isFetching, isSaving, data, history]);

  const handleChange = label => setActive(label);

  return (
    <div className="u-fullHeight">
      {(isFetching || !data) && <FullSpinner />}
      {!isFetching && data && (
        <div className="crud">
          <header className="crud__header  u-verticalCenter">
            <span style={{ marginLeft: 10 }}>{title}</span>
          </header>

          <div className="crud__content">
            <Tab
              tabs={[
                {
                  active: "Principal" === active,
                  component: (
                    <RastFormPrincipal
                      data={data}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      loading={isSaving}
                    />
                  ),
                  label: "Principal"
                },
                {
                  active: "Atletas" === active,
                  component: (
                    <RastFormAtletas
                      data={data}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      loading={isSaving}
                    />
                  ),
                  label: "Atletas"
                },
                {
                  active: "Teste" === active,
                  component: (
                    <RastFormTempos
                      data={data}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      loading={isSaving}
                    />
                  ),
                  disabled: !data.id,
                  label: "Teste"
                },
                {
                  active: "Resultado" === active,
                  component: (
                    <RastFormResultados
                      data={data}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      loading={isSaving}
                    />
                  ),
                  disabled: !data.id,
                  label: "Resultado"
                }
              ]}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RastFormContainer;

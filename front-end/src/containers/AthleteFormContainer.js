import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOne as fetchOneThunk, save } from "../thunks/athletes";
import { fetchedOne, fetchOne } from "../actions/athlete";

import Tab from "../components/lib/tab/Tab";
import FullSpinner from "../components/lib/spinner/FullSpinner";
import AthleteFormPrincipal from "../components/Athlete/AthleteFormPrincipal";
import AthleteFormTestes from "../components/Athlete/AthleteFormTestes";
import AthleteFormPeso from "../components/Athlete/AthleteFormPeso";

function AthleteFormContainer({ match, history }) {
  const { isFetching, isSaving, athlete } = useSelector(
    state => state.athlete.editing
  );
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  const [title, setTitle] = useState("");
  const [active, setActive] = useState("Principal");

  function handleCancel() {
    history.push(`/athletes`);
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

    if (athlete) {
      if (isNaN(match.params.id)) {
        setTitle("Novo atleta");
      } else {
        setTitle("Editando: " + athlete.name);
      }
    }
  }, [fetched, dispatch, match.params, isFetching, isSaving, athlete, history]);

  function createItem({ description }) {
    return <li>{description}</li>;
  }

  function filterBy(field) {
    return item => item[field];
  }

  function DescriptionItems({ items }) {
    return items.filter(filterBy("description")).map(createItem);
  }

  const handleChange = label => setActive(label);

  return (
    <div className="u-fullHeight">
      {(isFetching || !athlete) && <FullSpinner />}
      {!isFetching && athlete && (
        <div className="crud">
          <header className="crud__header  u-verticalCenter">
            <span style={{ marginLeft: 10 }}>{title}</span>
          </header>

          <div className="crud__content">
            <Tab
              tabs={[
                {
                  active: "Principal" === active,
                  label: "Principal",
                  component: (
                    <AthleteFormPrincipal
                      athlete={athlete}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      loading={isSaving}
                    />
                  )
                },
                {
                  active: "Histórico de peso" === active,
                  label: "Histórico de peso",
                  component: (
                    <AthleteFormPeso
                      athlete={athlete}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      loading={isSaving}
                      history={history}
                    />
                  )
                },
                {
                  active: "Histórico de testes" === active,
                  label: "Histórico de testes",
                  component: (
                    <AthleteFormTestes
                      athlete={athlete}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      loading={isSaving}
                      history={history}
                    />
                  )
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

export default AthleteFormContainer;

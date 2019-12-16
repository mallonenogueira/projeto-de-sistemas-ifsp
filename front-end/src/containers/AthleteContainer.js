import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Athlete from "../components/Athlete/Athlete";
import AthleteForm from "./AthleteFormContainer";

import { fetchAll, fetchOne, remove } from "../thunks/athletes";

function AthleteContainer({ match, history }) {
  const [fetched, setFetched] = useState(false);
  const { athletes, isFetching } = useSelector(state => state.athlete);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched && !isFetching) {
      dispatch(fetchAll());
      setFetched(true);
    }
  }, [fetched, isFetching, dispatch]);

  function handleEdit({ row }) {
    if (row && row.id) {
      dispatch(fetchOne());
      history.push(`/athletes/${row.id}`);
    }
  }

  function handleCreate() {
    dispatch(fetchOne());
    history.push("/athletes/new");
  }

  function handleDelete({ row }) {
    dispatch(remove(row.id));
  }

  return (
    <>
      <Route exact path={`${match.path}/:id`} component={AthleteForm} />
      <Route
        exact
        path={match.path}
        render={() => (
          <Athlete
            athletes={athletes}
            isLoading={isFetching || !fetched}
            onEdit={handleEdit}
            onCreate={handleCreate}
            onDelete={handleDelete}
          />
        )}
      />
    </>
  );
}

export default AthleteContainer;

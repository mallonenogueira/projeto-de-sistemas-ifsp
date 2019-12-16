import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAll, fetchOne, remove } from "../thunks/agility";
import Agility from "../components/Agility/Agility";
import AgilityForm from "./AgilityFormContainer";

function AgilityContainer({ match, history }) {
  const [fetched, setFetched] = useState(false);
  const { data, isFetching } = useSelector(state => state.agility);
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
      history.push(`/agility/${row.id}`);
    }
  }

  function handleCreate() {
    dispatch(fetchOne());
    history.push("/agility/new");
  }

  function handleDelete({ row }) {
    dispatch(remove(row.id));
  }

  return (
    <>
      <Route exact path={`${match.path}/:id`} component={AgilityForm} />
      <Route
        exact
        path={match.path}
        render={() => (
          <Agility
            data={data}
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

export default AgilityContainer;

import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchAll, fetchOne, remove } from "../thunks/rast";
import Rast from "../components/Rast/Rast";
import RastForm from "./RastFormContainer";

function RastContainer({ match, history }) {
  const [fetched, setFetched] = useState(false);
  const { data, isFetching } = useSelector(state => state.rast);
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
      history.push(`/rast/${row.id}`);
    }
  }

  function handleCreate() {
    dispatch(fetchOne());
    history.push("/rast/new");
  }

  function handleDelete({ row }) {
    dispatch(remove(row.id));
  }

  return (
    <>
      <Route exact path={`${match.path}/:id`} component={RastForm} />
      <Route
        exact
        path={match.path}
        render={() => (
          <Rast
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

export default RastContainer;

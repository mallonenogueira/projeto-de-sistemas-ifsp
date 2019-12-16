import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import service from "../services/team";
import Team from "../components/Team/Team";

import {
  fetchingTeam,
  addTeam,
  editTeam,
  removeEditTeam,
  setEditTeam,
  setCreateTeam,
  deleteTeam,
  saving
} from "../actions";

const fetchAll = async dispatch => {
  dispatch(fetchingTeam(true));

  try {
    const data = await service.list();
    dispatch(addTeam(data.content || []));
  } catch (err) {
    dispatch(addTeam([]));
  }

  dispatch(fetchingTeam(false));
};

function TeamContainer() {
  const teams = useSelector(state => state.team.teams);
  const isLoading = useSelector(state => state.team.isLoading);
  const editing = useSelector(state => state.team.editing);
  const fetched = useSelector(state => state.team.fetched);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched && !isLoading) {
      fetchAll(dispatch);
    }
  });

  function handleClose() {
    dispatch(removeEditTeam());
  }

  function handleCreate() {
    dispatch(setCreateTeam());
  }

  function handleEdit(id) {
    dispatch(setEditTeam(id));
  }

  async function handleDelete(id) {
    try {
      await service.delete(id);

      dispatch(deleteTeam(id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(team) {
    if (!team.name || !team.name.length) {
      return;
    }

    dispatch(saving());

    try {
      const response = await service.store({
        ...team,
        description:
          team.description.trim() === "" ? undefined : team.description
      });

      if (editing.id) {
        dispatch(editTeam(response));
      } else {
        dispatch(addTeam([response]));
      }

      handleClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Team
      onClose={handleClose}
      onCreate={handleCreate}
      onSubmit={handleSubmit}
      onEdit={handleEdit}
      onDelete={handleDelete}
      teams={teams}
      isLoading={isLoading}
      editing={editing}
    />
  );
}

export default TeamContainer;

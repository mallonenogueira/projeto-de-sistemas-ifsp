export const fetchingTeam = state => ({
  type: "FETCHING_TEAM",
  payload: state
});

export const addTeam = teams => ({
  type: "ADD_TEAM",
  payload: teams
});

export const setEditTeam = id => ({
  type: "SET_EDIT_TEAM",
  payload: id
});

export const setCreateTeam = () => ({
  type: "SET_CREATE_TEAM"
});

export const editTeam = team => ({
  type: "EDIT_TEAM",
  payload: team
});

export const removeEditTeam = () => ({
  type: "REMOVE_EDIT_TEAM"
});

export const deleteTeam = id => ({
  type: "DELETE_TEAM",
  payload: id
});

export const saving = id => ({
  type: "SAVING_TEAM"
});

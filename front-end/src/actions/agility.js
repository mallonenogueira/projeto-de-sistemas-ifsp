import {
  FETCH_ALL,
  FETCHED_ALL,
  FETCHED_ALL_ERROR,
  FETCH_ONE,
  FETCHED_ONE,
  FETCHED_ONE_ERROR,
  SAVE,
  SAVED,
  CREATE,
  CREATED,
  SAVE_ERROR,
  REMOVING,
  REMOVED,
  REMOVE_ERROR,
  ADD_ATHLETE,
  ADD_RESULT,
  CHANGE_PESO
} from "../types/agility";

export const fetchAll = state => ({
  type: FETCH_ALL
});

export const fetchedAll = data => ({
  type: FETCHED_ALL,
  payload: data
});

export const fetchedError = data => ({
  type: FETCHED_ALL_ERROR,
  payload: data
});

export const fetchOne = state => ({
  type: FETCH_ONE
});

export const fetchedOne = data => ({
  type: FETCHED_ONE,
  payload: data
});

export const fetchedOneError = data => ({
  type: FETCHED_ONE_ERROR,
  payload: data
});

export const save = () => ({
  type: SAVE
});

export const saved = data => ({
  type: SAVED,
  payload: data
});

export const created = data => ({
  type: CREATED,
  payload: data
});

export const create = () => ({
  type: CREATE
});

export const saveError = err => ({
  type: SAVE_ERROR,
  payload: err
});

export const removing = id => ({
  type: REMOVING,
  payload: id
});

export const removed = id => ({
  type: REMOVED,
  payload: id
});

export const removeError = (id, err) => ({
  type: REMOVE_ERROR,
  payload: {
    id,
    err
  }
});

export const addAthlete = athlete => ({
  type: ADD_ATHLETE,
  payload: athlete
});

export const changePeso = args => ({
  type: CHANGE_PESO,
  payload: args
});

export const addResult = ({ inscricaoId, time }) => ({
  type: ADD_RESULT,
  payload: {
    inscricaoId,
    time
  }
});

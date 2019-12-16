import service from "../services/athlete";

import {
  fetchAll as setFetching,
  fetchedError,
  fetchedAll,
  fetchOne as setFetchingOne,
  fetchedOneError,
  fetchedOne,
  save as saveLoading,
  saved,
  created,
  saveError,
  removing,
  removed,
  removeError
} from "../actions/athlete";

export const fetchAll = () => {
  return async dispatch => {
    dispatch(setFetching());

    return service
      .list()
      .then(({ content }) => dispatch(fetchedAll(content)))
      .catch(err => dispatch(fetchedError(err)));
  };
};

export const fetchOne = id => {
  return async dispatch => {
    dispatch(setFetchingOne());

    return service
      .find(id)
      .then(({ content }) => dispatch(fetchedOne(content)))
      .catch(err => dispatch(fetchedOneError(err)));
  };
};

export const save = data => {
  return async dispatch => {
    dispatch(saveLoading());

    return service
      .store(data)
      .then(response => {
        if (data.id) {
          dispatch(saved(data));
        } else {
          dispatch(
            created({
              id: response.id,
              ...data
            })
          );
        }
      })
      .catch(err => dispatch(saveError(err)));
  };
};

export const remove = id => {
  return async dispatch => {
    dispatch(removing(id));

    return service
      .delete(id)
      .then(() => dispatch(removed(id)))
      .catch(err => dispatch(removeError(err)));
  };
};

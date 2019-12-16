import {
  FETCH_ALL,
  FETCHED_ALL,
  FETCHED_ALL_ERROR,
  FETCH_ONE,
  FETCHED_ONE,
  FETCHED_ONE_ERROR,
  SAVE,
  SAVED,
  CREATED,
  SAVE_ERROR,
  REMOVING,
  REMOVED,
  REMOVE_ERROR
} from "../types/athletes";

const INITIAL_STATE = {
  athletes: [],
  isFetching: false,
  editing: {
    isFetching: false,
    isSaving: false,
    athlete: null
  }
};

const athlete = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        isFetching: true
      };
    case FETCHED_ALL:
      return {
        ...state,
        isFetching: false,
        athletes: [...action.payload]
      };
    case FETCHED_ALL_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        athletes: []
      };
    case FETCH_ONE:
      return {
        ...state,
        editing: {
          ...state.editing,
          isFetching: true,
          athlete: null
        }
      };
    case FETCHED_ONE:
      return {
        ...state,
        editing: {
          ...state.editing,
          isFetching: false,
          athlete: action.payload
        }
      };
    case FETCHED_ONE_ERROR:
      return {
        ...state,
        editing: {
          ...state.editing,
          isFetching: false,
          athlete: null,
          error: action.payload
        }
      };
    case SAVE:
      return {
        ...state,
        editing: {
          ...state.editing,
          isSaving: true
        }
      };
    case SAVED:
      return {
        ...state,
        athletes: state.athletes.map(i => {
          if (action.payload.id === i.id) {
            return {
              ...i,
              ...action.payload
            };
          }

          return i;
        }),
        editing: {
          ...state.editing,
          athlete: action.payload,
          isSaving: false
        }
      };
    case CREATED:
      return {
        ...state,
        athletes: [...state.athletes, action.payload],
        editing: {
          ...state.editing,
          athlete: action.payload,
          isSaving: false
        }
      };
    case SAVE_ERROR:
      return {
        ...state,
        editing: {
          ...state.editing,
          isSaving: false,
          error: action.payload
        }
      };
    case REMOVING:
      return {
        ...state,
        athletes: state.athletes.map(i => {
          if (action.payload === i.id) {
            return {
              ...i,
              removing: true
            };
          }

          return i;
        })
      };
    case REMOVED:
      return {
        ...state,
        athletes: state.athletes.filter(({ id }) => action.payload !== id)
      };
    case REMOVE_ERROR:
      return {
        ...state,
        athletes: state.athletes.map(i => {
          if (action.payload.id === i.id) {
            return {
              ...i,
              err: action.payload.err
            };
          }

          return i;
        })
      };
    default:
      return state;
  }
};

export default athlete;

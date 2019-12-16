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
  REMOVE_ERROR,
  ADD_ATHLETE,
  ADD_RESULT,
  CHANGE_PESO
} from "../types/rast";

const INITIAL_STATE = {
  data: [],
  isFetching: false,
  editing: {
    isFetching: false,
    isSaving: false,
    data: null
  }
};

const data = (state = INITIAL_STATE, action) => {
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
        data: [...action.payload]
      };
    case FETCHED_ALL_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        data: []
      };
    case FETCH_ONE:
      return {
        ...state,
        editing: {
          ...state.editing,
          isFetching: true,
          data: null
        }
      };
    case FETCHED_ONE:
      return {
        ...state,
        editing: {
          ...state.editing,
          isFetching: false,
          data: action.payload
        }
      };
    case FETCHED_ONE_ERROR:
      return {
        ...state,
        editing: {
          ...state.editing,
          isFetching: false,
          data: null,
          error: action.payload
        }
      };
    case ADD_ATHLETE:
      return {
        ...state,
        editing: {
          ...state.editing,
          data: {
            ...state.editing.data,
            athletes: [...(state.editing.data.athletes || []), action.payload]
          }
        }
      };
    case ADD_RESULT:
      return {
        ...state,
        editing: {
          ...state.editing,
          data: {
            ...state.editing.data,
            athletes: state.editing.data.athletes.map(athlete => {
              if (athlete.inscricaoId === action.payload.inscricaoId) {
                if (athlete.results && athlete.results.length >= 8) {
                  return athlete;
                }

                return {
                  ...athlete,
                  results: [
                    ...(athlete.results || []),
                    {
                      time: action.payload.time
                    }
                  ]
                };
              }

              return athlete;
            })
          }
        }
      };
    case CHANGE_PESO:
      return {
        ...state,
        editing: {
          ...state.editing,
          data: {
            ...state.editing.data,
            athletes: state.editing.data.athletes.map((athlete, index) => {
              if (index === action.payload.index) {
                return {
                  ...athlete,
                  kilo: action.payload.kilo
                };
              }

              return athlete;
            })
          }
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
        data: state.data.map(i => {
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
          data: action.payload,
          isSaving: false
        }
      };
    case CREATED:
      return {
        ...state,
        data: [...state.data, action.payload],
        editing: {
          ...state.editing,
          data: action.payload,
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
        data: state.data.map(i => {
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
        data: state.data.filter(({ id }) => action.payload !== id)
      };
    case REMOVE_ERROR:
      return {
        ...state,
        data: state.data.map(i => {
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

export default data;

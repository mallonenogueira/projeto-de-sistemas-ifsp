const INITIAL_STATE = {
  teams: [],
  editing: null,
  fetched: false,
  isLoading: false
};

const todos = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCHING_TEAM":
      return {
        ...state,
        isLoading: action.payload
      };
    case "ADD_TEAM":
      return {
        ...state,
        fetched: true,
        teams: [...state.teams, ...action.payload]
      };
    case "DELETE_TEAM":
      return {
        ...state,
        teams: state.teams.filter(({ id }) => id !== action.payload)
      };
    case "SET_EDIT_TEAM":
      return {
        ...state,
        editing: state.teams.find(({ id }) => id === action.payload)
      };
    case "SAVING_TEAM":
      return {
        ...state,
        editing: {
          ...state.editing,
          loading: true
        }
      };
    case "SET_CREATE_TEAM":
      return {
        ...state,
        editing: {}
      };
    case "EDIT_TEAM":
      return {
        ...state,
        editing: {
          ...state.editing,
          ...action.payload,
          loading: false
        },
        teams: state.teams.map(team => {
          if (team.id === action.payload.id) {
            return {
              ...team,
              ...action.payload
            };
          }

          return team;
        })
      };
    case "REMOVE_EDIT_TEAM":
      return {
        ...state,
        editing: null
      };
    default:
      return state;
  }
};

export default todos;

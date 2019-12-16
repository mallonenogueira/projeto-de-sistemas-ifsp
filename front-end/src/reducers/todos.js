const INITIAL_STATE = {
  teams: []
};

const todos = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case "TOGGLE_TODO":
      return state.map((todo, index) =>
        index !== action.index ? todo : { ...todo, completed: !todo.completed }
      );
    default:
      return state;
  }
};

export default todos;

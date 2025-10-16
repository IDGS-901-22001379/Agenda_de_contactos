export const ContactosReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];

    case "delete":
      return state.filter((c) => c.id !== action.payload.id);

    case "update":
      return state.map((c) =>
        c.id === action.payload.id ? { ...c, ...action.payload.data } : c
      );

    default:
      return state;
  }
};

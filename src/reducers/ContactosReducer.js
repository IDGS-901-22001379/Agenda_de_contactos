// Definicion el reducer de contactos cmo una arrow funcion que recibe
// solo dos prarametros que son : un state  un action
export const ContactosReducer = (state, action) => {
  //Todo action tiene un tipo, para lo cual agragamos un switch-case
  //para determinar que tipo  es
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((actual) => actual.id !== action.payload);

    default:
      return state;
  }
};

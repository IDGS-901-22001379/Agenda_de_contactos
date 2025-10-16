import React, { useEffect, useReducer, useState } from "react";
import TablaContactos from "./TablaContactos";
import { ContactosReducer } from "../../reducers/ContactosReducer";
import Formulario from "./Formulario";

// Inicializar desde localStorage
const init = () => {
  const contactos = localStorage.getItem("contactos");
  return contactos ? JSON.parse(contactos) : [];
};

const Contactos = () => {
  // Reducer con estado inicial desde localStorage
  const [state, dispatch] = useReducer(ContactosReducer, [], init);

  // Controla la visibilidad del formulario
  const [formView, setFormView] = useState(false);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(state));
  }, [state]);

  return (
    <div className="container mt-3">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2 className="h5 m-0">Agenda</h2>
        <button
          onClick={() => setFormView((v) => !v)}
          className={`btn ${formView ? "btn-secondary" : "btn-success"}`}
        >
          {formView ? "Cerrar formulario" : "+ Agregar contacto"}
        </button>
      </div>

      {formView && (
        <div className="mb-3">
          <Formulario dispatch={dispatch} />
        </div>
      )}

      <TablaContactos contactos={state} dispatch={dispatch} />
    </div>
  );
};

export default Contactos;

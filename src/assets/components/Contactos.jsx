import React, { useEffect, useReducer, useState } from "react";
import TablaContactos from "./TablaContactos";
import { ContactosReducer } from "../../reducers/ContactosReducer";
import Formulario from "./Formulario";

const init = () => {
  const contactos = localStorage.getItem("contactos");
  return contactos ? JSON.parse(contactos) : [];
};

const Contactos = () => {
  const [state, dispatch] = useReducer(ContactosReducer, [], init);

  // Control del formulario (mostrar/ocultar) y edición
  const [formView, setFormView] = useState(false);
  const [editContact, setEditContact] = useState(null); // objeto completo o null

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(state));
  }, [state]);

  const handleEdit = (contacto) => {
    setEditContact(contacto);
    setFormView(true);
  };

  const handleCloseForm = () => {
    setEditContact(null);
    setFormView(false);
  };

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
          <Formulario
            key={editContact?.id || "nuevo"} // fuerza reset visual al cambiar entre editar/nuevo
            dispatch={dispatch}
            initialData={editContact}
            onAfterSubmit={handleCloseForm}
          />
        </div>
      )}

      <TablaContactos
        contactos={state}
        dispatch={dispatch}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Contactos;

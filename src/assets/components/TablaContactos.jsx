import React from "react";

const TablaContactos = ({ contactos = [], dispatch }) => {
  // Método para el botón eliminar
  const handleDelete = (id) => {
    dispatch({
      type: "delete",
      payload: { id },
    });
  };

  return (
    <section id="tabla">
      <h2 className="h5 mb-3">Contactos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>nombre</th>
            <th>numero</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contactos.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Sin contactos
              </td>
            </tr>
          ) : (
            contactos.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.numero}</td>
                <td>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default TablaContactos;

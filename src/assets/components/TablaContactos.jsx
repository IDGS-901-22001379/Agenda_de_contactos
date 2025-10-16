import React from "react";

// util: edad desde 'YYYY-MM-DD'
const calcEdad = (yyyy_mm_dd) => {
  if (!yyyy_mm_dd) return "-";
  const b = new Date(yyyy_mm_dd + "T00:00:00");
  const t = new Date();
  let age = t.getFullYear() - b.getFullYear();
  const m = t.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
  return age >= 0 ? age : "-";
};

const shortId = (id) => String(id).substring(0, 5);

const TablaContactos = ({ contactos = [], dispatch, onEdit }) => {
  const handleDelete = (id) => {
    dispatch({ type: "delete", payload: { id } });
  };

  return (
    <section id="tabla">
      <h2 className="h5 mb-3">Lista de contactos</h2>

      {/* Responsiva con Bootstrap */}
      <div className="table-responsive">
        <table
          className="table table-striped table-hover align-middle fs-5"
          style={{ minWidth: 900 }}
        >
          <thead>
            <tr className="bg-success text-white">
              <th className="text-uppercase py-3">Avatar</th>
              <th className="text-uppercase py-3">ID</th>
              <th className="text-uppercase py-3">Nombre</th>
              <th className="text-uppercase py-3">Número</th>
              <th className="text-uppercase py-3">Sexo</th>
              <th className="text-uppercase py-3">Cumpleaños</th>
              <th className="text-uppercase py-3">Edad</th>
              <th className="text-uppercase text-center py-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {contactos.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Sin contactos
                </td>
              </tr>
            ) : (
              contactos.map((c) => (
                <tr key={c.id}>
                  <td className="py-3">
                    {c.imagen ? (
                      <img
                        src={c.imagen}
                        alt={c.nombre}
                        style={{
                          width: 56,
                          height: 56,
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "1px solid #e9ecef",
                        }}
                      />
                    ) : (
                      <div
                        title="Sin imagen"
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "#f1f3f5",
                          border: "1px solid #e9ecef",
                        }}
                      />
                    )}
                  </td>

                  <td className="py-3" title={c.id}>
                    {shortId(c.id)}
                  </td>
                  <td className="py-3">{c.nombre}</td>
                  <td className="py-3">{c.numero}</td>
                  <td className="py-3">{c.sexo || "-"}</td>
                  <td className="py-3">{c.cumple || "-"}</td>
                  <td className="py-3">{calcEdad(c.cumple)}</td>

                  <td className="text-nowrap text-center py-3">
                    <button
                      onClick={() => onEdit && onEdit(c)}
                      className="btn btn-primary me-2"
                      title="Modificar contacto"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="btn btn-danger"
                      title="Eliminar contacto"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TablaContactos;

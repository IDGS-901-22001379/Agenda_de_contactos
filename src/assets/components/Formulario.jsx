import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const Formulario = ({ dispatch }) => {
  const [data, setData] = useState({ nombre: "", numero: "" });
  const { nombre, numero } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !numero.toString().trim()) {
      // Puedes cambiar esto por un toast/alert bonito
      alert("Por favor, llena nombre y número.");
      return;
    }

    dispatch({
      type: "add",
      payload: {
        id: uuid(),
        nombre: nombre.trim(),
        numero: numero.toString().trim(),
      },
    });

    setData({ nombre: "", numero: "" });
  };

  return (
    <section id="form" className="mb-3">
      <h2 className="h5 mb-3">Agregar contacto</h2>

      <form onSubmit={handleAdd}>
        <label className="mx-1 d-grid gap-2" htmlFor="nombre">
          nombre:
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="form-control"
            autoComplete="off"
            value={nombre}
            onChange={handleChange}
            required
          />
        </label>

        <label className="mx-1 d-grid gap-2" htmlFor="numero">
          numero:
          <input
            id="numero"
            name="numero"
            type="tel"
            className="form-control"
            autoComplete="off"
            value={numero}
            onChange={handleChange}
            required
          />
        </label>

        <div className="mx-1 d-grid gap-2">
          <button type="submit" className="btn btn-info mt-2">
            Agregar
          </button>
        </div>
      </form>
    </section>
  );
};

export default Formulario;

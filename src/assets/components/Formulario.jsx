import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";

// util: convertir archivo a dataURL
const fileToDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// util: validar fecha pasada
const isPastDate = (yyyy_mm_dd) => {
  if (!yyyy_mm_dd) return false;
  const d = new Date(yyyy_mm_dd + "T00:00:00");
  const today = new Date();
  return d <= today;
};

const Formulario = ({ dispatch, initialData = null, onAfterSubmit }) => {
  const empty = {
    nombre: "",
    numero: "",
    sexo: "", // 'M' | 'F' | 'Otro'
    cumple: "", // 'YYYY-MM-DD'
    imagen: "", // url o dataURL
  };

  const [data, setData] = useState(
    initialData
      ? {
          nombre: initialData.nombre || "",
          numero: initialData.numero || "",
          sexo: initialData.sexo || "",
          cumple: initialData.cumple || "",
          imagen: initialData.imagen || "",
        }
      : empty
  );

  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const { nombre, numero, sexo, cumple, imagen } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    // Opcional: limitar tamaño (p.ej. 300KB)
    if (f.size > 300 * 1024) {
      setErrors((p) => ({ ...p, imagen: "La imagen debe pesar ≤ 300KB." }));
      return;
    }
    try {
      const dataURL = await fileToDataURL(f);
      setData((p) => ({ ...p, imagen: dataURL }));
      setErrors((p) => ({ ...p, imagen: null }));
    } catch {
      setErrors((p) => ({ ...p, imagen: "No se pudo leer la imagen." }));
    }
  };

  const validate = () => {
    const e = {};
    if (!nombre.trim()) e.nombre = "Nombre es requerido.";
    if (!numero.toString().trim()) e.numero = "Número es requerido.";
    if (!/^\+?\d[\d\s-]{6,}$/.test(numero.toString().trim()))
      e.numero = "Ingresa un teléfono válido.";
    if (!sexo) e.sexo = "Selecciona el sexo.";
    if (!cumple) e.cumple = "La fecha de nacimiento es requerida.";
    else if (!isPastDate(cumple)) e.cumple = "La fecha debe ser pasada.";
    // imagen es opcional (puede venir por archivo o URL). Si pones URL, validamos formato simple:
    if (
      imagen &&
      !/^data:image\/|^https?:\/\/.+\.(png|jpe?g|gif|webp)$/i.test(imagen)
    )
      e.imagen =
        "Usa un archivo o una URL válida de imagen (png/jpg/gif/webp).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (initialData?.id) {
      // update
      dispatch({
        type: "update",
        payload: {
          id: initialData.id,
          data: {
            nombre: nombre.trim(),
            numero: numero.toString().trim(),
            sexo,
            cumple,
            imagen: imagen || "",
          },
        },
      });
    } else {
      // add
      dispatch({
        type: "add",
        payload: {
          id: uuid(),
          nombre: nombre.trim(),
          numero: numero.toString().trim(),
          sexo,
          cumple,
          imagen: imagen || "",
        },
      });
    }

    // limpiar formulario y cerrar
    setData(empty);
    fileRef.current && (fileRef.current.value = "");
    setErrors({});
    onAfterSubmit && onAfterSubmit();
  };

  return (
    <section id="form" className="mb-3">
      <h2 className="h5 mb-3">
        {initialData ? "Modificar contacto" : "Agregar contacto"}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Nombre */}
        <label className="mx-1 d-grid gap-2" htmlFor="nombre">
          nombre:
          <input
            id="nombre"
            name="nombre"
            type="text"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            autoComplete="off"
            value={nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && (
            <div className="invalid-feedback">{errors.nombre}</div>
          )}
        </label>

        {/* Número */}
        <label className="mx-1 d-grid gap-2" htmlFor="numero">
          numero:
          <input
            id="numero"
            name="numero"
            type="tel"
            className={`form-control ${errors.numero ? "is-invalid" : ""}`}
            autoComplete="off"
            value={numero}
            onChange={handleChange}
            required
          />
          {errors.numero && (
            <div className="invalid-feedback">{errors.numero}</div>
          )}
        </label>

        {/* Sexo (select simple, puedes cambiar a radios si prefieres) */}
        <label className="mx-1 d-grid gap-2" htmlFor="sexo">
          sexo:
          <select
            id="sexo"
            name="sexo"
            className={`form-select ${errors.sexo ? "is-invalid" : ""}`}
            value={sexo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona…</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          {errors.sexo && <div className="invalid-feedback">{errors.sexo}</div>}
        </label>

        {/* Cumpleaños */}
        <label className="mx-1 d-grid gap-2" htmlFor="cumple">
          cumpleaños:
          <input
            id="cumple"
            name="cumple"
            type="date"
            className={`form-control ${errors.cumple ? "is-invalid" : ""}`}
            value={cumple}
            onChange={handleChange}
            required
          />
          {errors.cumple && (
            <div className="invalid-feedback">{errors.cumple}</div>
          )}
        </label>

        {/* Imagen desde archivo */}
        <label className="mx-1 d-grid gap-2" htmlFor="imagenFile">
          imagen (archivo):
          <input
            id="imagenFile"
            ref={fileRef}
            type="file"
            accept="image/*"
            className={`form-control ${errors.imagen ? "is-invalid" : ""}`}
            onChange={handleFile}
          />
        </label>

        {/* O URL de imagen */}
        <label className="mx-1 d-grid gap-2" htmlFor="imagenUrl">
          o URL de imagen:
          <input
            id="imagenUrl"
            name="imagen"
            type="url"
            placeholder="https://.../avatar.jpg"
            className={`form-control ${errors.imagen ? "is-invalid" : ""}`}
            value={imagen && !imagen.startsWith("data:image") ? imagen : ""}
            onChange={handleChange}
          />
          {errors.imagen && (
            <div className="invalid-feedback">{errors.imagen}</div>
          )}
        </label>

        {/* Vista previa (si hay imagen) */}
        {imagen && (
          <div className="mx-1 my-2">
            <img
              src={imagen}
              alt="preview"
              style={{ maxWidth: 120, maxHeight: 120, borderRadius: "8px" }}
            />
          </div>
        )}

        <div className="mx-1 d-grid gap-2">
          <button type="submit" className="btn btn-info mt-2">
            {initialData ? "Guardar cambios" : "Agregar"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Formulario;

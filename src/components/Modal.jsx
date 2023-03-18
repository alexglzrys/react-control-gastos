import { useState } from "react";
import CerrarModal from "../img/cerrar.svg";
import { Mensaje } from "./Mensaje";
import { generarId } from '../helpers'

export const Modal = ({ handleCerrarModal, animarModal, handleGuardarGasto }) => {
  // Estado local del formulario de gastos
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  const [mensaje, setMensaje] = useState("");

  // Contraldor de envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar formulario
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      // Desaparecer el mensaje en 1 segundo
      setTimeout(() => {
        setMensaje("");
      }, 1000);
      return false;
    }

    // Guardar el nuevo gasto
    handleGuardarGasto({
        id: generarId(), 
        nombre, 
        cantidad, 
        categoria,
        fecha: Date.now()
    })
    // Animar y cerrar modal
    handleCerrarModal()
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={handleCerrarModal} />
      </div>
      {/* Las transiciones de CSS manejadas con un setTimeOur, permiten mostrar animaciones sencillas sobre aplicaciones react con base al cambio en el estado */}
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>Nuevo Gasto</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Nombre Gasto</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="catgoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" defaultValue disabled>
              -- Seleccione --
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value="Añadir Gasto" />
      </form>
    </div>
  );
};

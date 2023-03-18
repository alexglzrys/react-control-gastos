import { useEffect, useState } from "react";
import CerrarModal from "../img/cerrar.svg";
import { Mensaje } from "./Mensaje";
import { generarId } from '../helpers'

export const Modal = ({ handleCerrarModal, animarModal, handleGuardarGasto, editarGasto }) => {
  // Estado local del formulario de gastos
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");

  // Estado complementario para gastos a editar
  const [fecha, setFecha] = useState("")
  const [id, setId] = useState("")

  const [mensaje, setMensaje] = useState("");

  // Efecto secundario para detectar si el modal fue abierto para editar un gasto
  useEffect(() => {
    // Si el gasto a editar no viene vació, significa que se desa editar un gasto
    if (Object.keys(editarGasto).length > 0) {
      setNombre(editarGasto.nombre);
      setCantidad(editarGasto.cantidad)
      setCategoria(editarGasto.categoria)
      setFecha(editarGasto.fecha)
      setId(editarGasto.id)
    }
  }, [editarGasto])

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

    // Verificar si se trata de un registro neuvo o una actualización
    if (id) {
      // actualización
      handleGuardarGasto({
        id,
        nombre, 
        cantidad, 
        categoria,
        fecha: Date.now()
      }, 'edit')
    } else {
      // Guardar el nuevo gasto
      handleGuardarGasto({
        id: generarId(), 
        nombre, 
        cantidad, 
        categoria,
        fecha: Date.now()
      }, 'new')
    }
    
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
        <legend>{editarGasto.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
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
          <label htmlFor="cantidad">Cantidad Gasto</label>
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
        <input type="submit" value={editarGasto.nombre ? 'Actualizar Cambios' : 'Añadir Gasto'} />
      </form>
    </div>
  );
};

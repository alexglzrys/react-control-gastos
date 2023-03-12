import { useState } from "react";
import { Mensaje } from "./Mensaje";

export const NuevoPresupuesto = ({ handleEstablecerPresupuesto }) => {
  // Variables de estado para el control de formulario
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState(0);
  const [mensaje, setMensaje] = useState("");

  // Establecer el nuevo presupuesto en el estado global de la aplicacion
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que el presupuesto sea válido
    if (!Number(nuevoPresupuesto) || Number(nuevoPresupuesto) < 0) {
      setMensaje("No es un presupuesto válido");
      return;
    }

    handleEstablecerPresupuesto(Number(nuevoPresupuesto));
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>
          <input
            type="text"
            className="nuevo-presupuesto"
            placeholder="Añade tu Presupuesto"
            value={nuevoPresupuesto}
            onChange={(e) => setNuevoPresupuesto(e.target.value)}
          />
          <input type="submit" value="Añadir" />
        </div>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

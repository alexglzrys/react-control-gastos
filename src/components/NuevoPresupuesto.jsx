import { useState } from "react";

export const NuevoPresupuesto = ({handleEstablecerPresupuesto}) => {
  // Variables de estado para el control de formulario
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState(0);

  // Establecer el nuevo presupuesto en el estado global de la aplicacion
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que el presupuesto sea válido
    if (!Number(nuevoPresupuesto) || Number(nuevoPresupuesto) < 0) return

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
      </form>
    </div>
  );
};

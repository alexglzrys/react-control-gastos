import React from "react";

// Funciòn de utilidad para formatear monedas a peso mexicano
export const ControlPresupuesto = ({ presupuesto }) => {
  const formatearMoneda = (cantidad) => {
    return cantidad.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>Gráfica</p>
      </div>
      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formatearMoneda(presupuesto)}
        </p>
        <p>
          <span>Disponible: </span>
          {formatearMoneda(0)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearMoneda(0)}
        </p>
      </div>
    </div>
  );
};

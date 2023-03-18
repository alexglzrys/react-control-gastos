import React, { useEffect, useState } from "react";

// Funciòn de utilidad para formatear monedas a peso mexicano
export const ControlPresupuesto = ({ presupuesto, gastos }) => {

  // Estado interno para conocer el dinero disponible y el dinero gastado
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)

  // Efecto secundario para estar atento a los nuevos gastos generados
  useEffect(() => {
    // Obtener la sumatoria de todo lo gastado
    const total_gastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const presupuesto_disponible = presupuesto - total_gastado;
    
    setGastado(total_gastado)
    setDisponible(presupuesto_disponible)
  }, [gastos]);

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
          {formatearMoneda(disponible)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatearMoneda(gastado)}
        </p>
      </div>
    </div>
  );
};

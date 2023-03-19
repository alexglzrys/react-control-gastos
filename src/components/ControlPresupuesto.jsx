import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Funciòn de utilidad para formatear monedas a peso mexicano
export const ControlPresupuesto = ({ presupuesto, gastos, handleResetApp }) => {
  // Estado interno para conocer el dinero disponible y el dinero gastado
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  // Efecto secundario para estar atento a los nuevos gastos generados
  useEffect(() => {
    // Obtener la sumatoria de todo lo gastado
    const total_gastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const presupuesto_disponible = presupuesto - total_gastado;

    // calcular el porcentaje gastado
    const porcentaje_gastado = ((total_gastado * 100) / presupuesto).toFixed(2);

    setGastado(total_gastado);
    setDisponible(presupuesto_disponible);
    // Retrasar el efecto de animación del circulo de progreso
    setTimeout(() => {
      setPorcentaje(porcentaje_gastado);
    }, 700);
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
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
            pathColor: disponible < 0 ? '#972424' : '#3b82f6', // color de barra
            trailColor: '#f5f5f5', // color del espacio vacio
            textColor: disponible < 0 ? '#972424' : '#3b82f6', // color del texto en gráfico
          })}
        />
      </div>
      <div className="contenido-presupuesto">
        <button type="button" className="reset-app" onClick={handleResetApp}>Resetar Aplicacion</button>
        <p>
          <span>Presupuesto: </span>
          {formatearMoneda(presupuesto)}
        </p>
        {/* Mostrar una clase de css condicional para cambiar de color el texto cuando los gastos sean superiores al presupuesto */}
        <p className={`${disponible < 0 ? 'negativo' : null}`}>
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

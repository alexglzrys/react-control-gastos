import { ControlPresupuesto } from "./ControlPresupuesto";
import { NuevoPresupuesto } from "./NuevoPresupuesto";

export const Header = ({
  handleEstablecerPresupuesto,
  esPresupuestoValido,
  presupuesto,
  gastos,
  handleResetApp
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {esPresupuestoValido ? (
        <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} handleResetApp={handleResetApp} />
      ) : (
        <NuevoPresupuesto
          handleEstablecerPresupuesto={handleEstablecerPresupuesto}
        />
      )}
    </header>
  );
};

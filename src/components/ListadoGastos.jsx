import { Gasto } from "./Gasto";

export const ListadoGastos = ({
  gastos,
  handleEditarGasto,
  handleEliminarGasto,
}) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Gastos" : "No hay gastos registrados"}</h2>
      {gastos.map((gasto) => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          handleEditarGasto={handleEditarGasto}
          handleEliminarGasto={handleEliminarGasto}
        />
      ))}
    </div>
  );
};

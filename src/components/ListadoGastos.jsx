import { Gasto } from "./Gasto";

export const ListadoGastos = ({
  gastos,
  gastosFiltrados,
  filtro,
  handleEditarGasto,
  handleEliminarGasto,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {/* Condicional para mostrar todos los gastos o gastos filtrados */}
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? `Gastos en la categoría ${filtro}`
              : `No hay gastos registrados en la categoría ${filtro}`}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              handleEditarGasto={handleEditarGasto}
              handleEliminarGasto={handleEliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "No hay gastos registrados"}</h2>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              handleEditarGasto={handleEditarGasto}
              handleEliminarGasto={handleEliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

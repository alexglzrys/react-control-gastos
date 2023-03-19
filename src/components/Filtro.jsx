import { useEffect, useState } from "react";

export const Filtro = ({ handleFiltrarGastos }) => {
  const [categoria, setCategoria] = useState("");

  // No hay una acción para el envio de formulario
  // entonces se declara un efecto secundario que escuche cualquier cambio de valor en categoría (filtro seleccionado)
  useEffect(() => {
    handleFiltrarGastos(categoria);
  }, [categoria]);
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="categoria">Filtrar Gastos</label>
          <select
            id="catgoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" defaultValue>
              -- Todos los gastos --
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
      </form>
    </div>
  );
};

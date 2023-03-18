// Al igual que en jQuery, existen muchas librerías para React
// En NPM, podemos buscar librerías para React anteponiendo react-
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatearFecha } from "../helpers";

import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

// Diccionario de imagenes,
// Nos da la ventaja de asociar su key con la categoria guardada en el objeto de gasto
const diccionarioIconos = {
  ahorro: IconoAhorro,
  casa: IconoCasa,
  comida: IconoComida,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

export const Gasto = ({ gasto, handleEditarGasto, handleEliminarGasto }) => {
  const { id, nombre, cantidad, categoria, fecha } = gasto;

  // Acciones cuando se desliza el elemento a la derecha
 const leadingActions = () => (
    // Pasar la información del gasto seleccionado para su correspiente edición
    <LeadingActions>
      <SwipeAction onClick={() => handleEditarGasto(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
 );
  // Acciones cuando se desliza el elemento a la izquierda
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => handleEliminarGasto(gasto.id)}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    // Implementar librería React Swipeable List al este elemento de React
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[categoria]} alt={categoria} />
            <div className="descripcion-gasto">
              <p className="categoria">{categoria}</p>
              <p className="nombre-gasto">{nombre}</p>
              <p className="fecha-gasto">
                Agregado el <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

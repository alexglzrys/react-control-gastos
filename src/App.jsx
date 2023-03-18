import { useState } from "react";
import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { Modal } from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  // Estado global
  const [presupuesto, setPresupuesto] = useState(0);
  const [esPresupuestoValido, setEsPresupuestoValido] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [editarGasto, setEditarGasto] = useState({});

  // Establecer el nuevo presupuesto en el estado global
  const handleEstablecerPresupuesto = (nuevo_presupuesto) => {
    setPresupuesto(nuevo_presupuesto);
    setEsPresupuestoValido(true);
  };

  const handleNuevoGasto = () => {
    setModal(true);
    // Mostrar animación de CSS un segundo después sobre el formulario
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const handleCerrarModal = () => {
    // Primero muestro la animación en el fomrulario y después cierro el modal
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);

    // Si existe un gasto por editar en el estado, significa que acaba de ser editado antes de cerrar el modal. por tanto se elimina
    if (Object.keys(editarGasto).length > 0) {
      setEditarGasto({})
    }
  };

  const handleGuardarGasto = (nuevo_gasto, type) => {
    // Verificar si se trata de un nuevo gasto, o un gasto actualizado
    if (type == 'edit') {
      const gastos_actualizados = gastos.map((gasto) => gasto.id === nuevo_gasto.id ? nuevo_gasto : gasto)
      setGastos(gastos_actualizados);
    } else {
      setGastos([...gastos, nuevo_gasto]);
    }
  };

  const handleEditarGasto = (gasto_seleccionado) => {
    setEditarGasto(gasto_seleccionado);
    // Abrir ventana modal
    handleNuevoGasto();
  };

  // controlador para eliminar un gasto por su id
  const handleEliminarGasto = (id) => {
    const gastos_actualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastos_actualizados);
  }

  return (
    <div className={modal ? "fijar" : null}>
      <Header
        handleEstablecerPresupuesto={handleEstablecerPresupuesto}
        esPresupuestoValido={esPresupuestoValido}
        presupuesto={presupuesto}
        gastos={gastos}
      />
      {/* Mostrar el icono de agregar nuevo gasto solo cuando el presupuesto sea válido */}
      {esPresupuestoValido && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              handleEditarGasto={handleEditarGasto}
              handleEliminarGasto={handleEliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {/* Mostrar modal cunado se establece un nuevo gasto */}
      {modal && (
        <Modal
          handleCerrarModal={handleCerrarModal}
          animarModal={animarModal}
          handleGuardarGasto={handleGuardarGasto}
          editarGasto={editarGasto}
        />
      )}
    </div>
  );
}

export default App;

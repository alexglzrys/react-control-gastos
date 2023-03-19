import { useEffect, useState } from "react";
import { Filtro } from "./components/Filtro";
import { Header } from "./components/Header";
import { ListadoGastos } from "./components/ListadoGastos";
import { Modal } from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

// leer desde localStorage el presupuesto inicial
const presupuesto_inicial = Number(localStorage.getItem('presupuesto') ?? 0);
const gastos_inicial = JSON.parse(localStorage.getItem('gastos')) ?? [];

function App() {
  // Estado global
  const [presupuesto, setPresupuesto] = useState(presupuesto_inicial);
  const [esPresupuestoValido, setEsPresupuestoValido] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(gastos_inicial);
  const [editarGasto, setEditarGasto] = useState({});

  // estado para los filtros
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // Efecto secubdario para detectar cambios en el presupuesto, y establecerlo en localStorage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto);
    if (presupuesto > 0) {
      setEsPresupuestoValido(true)
    }
  }, [presupuesto])

  // Efecto secundario para detectar cambios en los gastos registrados, y establecerlos en localStorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

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

  // Si hay una categoría, entonces se seleccionó un filtro, caso contrario, se quiere ver todos los gastos
  const handleFiltrarGastos = (categoria) => {
    if (categoria) {
      const gastos_filtrados = gastos.filter((gasto) => gasto.categoria === categoria);
      setGastosFiltrados(gastos_filtrados)
      setFiltro(categoria)
    } else {
      setGastosFiltrados([]);
      setFiltro('');
    }
  }

  // controlador para resetear informacion del App (nuevos presupuestos del mes)
  const handleResetApp = () => {
    if (window.confirm('¿Deseas resetar la información?')) {
      setPresupuesto(0)
      setEsPresupuestoValido(false)
      setGastos([]);
    }
  }

  return (
    <div className={modal ? "fijar" : null}>
      <Header
        handleEstablecerPresupuesto={handleEstablecerPresupuesto}
        esPresupuestoValido={esPresupuestoValido}
        presupuesto={presupuesto}
        gastos={gastos}
        handleResetApp={handleResetApp}
      />
      {/* Mostrar el icono de agregar nuevo gasto solo cuando el presupuesto sea válido */}
      {esPresupuestoValido && (
        <>
          <main>
            <Filtro handleFiltrarGastos={handleFiltrarGastos} />
            <ListadoGastos
              gastos={gastos}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
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

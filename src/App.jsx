import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
  // Estado global
  const [presupuesto, setPresupuesto] = useState(0);
  const [esPresupuestoValido, setEsPresupuestoValido] = useState(false);
  const [modal, setModal] = useState(false);

  // Establecer el nuevo presupuesto en el estado global
  const handleEstablecerPresupuesto = (nuevo_presupuesto) => {
    setPresupuesto(nuevo_presupuesto);
    setEsPresupuestoValido(true);
  };

  const handleNuevoGasto = () => {
    setModal(true);
  };

  const handleCerrarModal = () => {
    setModal(false);
  }

  return (
    <div>
      <Header
        handleEstablecerPresupuesto={handleEstablecerPresupuesto}
        esPresupuestoValido={esPresupuestoValido}
        presupuesto={presupuesto}
      />
      {/* Mostrar el icono de agregar nuevo gasto solo cuando el presupuesto sea válido */}
      {esPresupuestoValido && (
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
      )}
      {/* Mostrar modal cunado se establece un nuevo gasto */}
      {modal && <Modal handleCerrarModal={handleCerrarModal} />}
    </div>
  );
}

export default App;

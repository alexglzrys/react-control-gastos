import { useState } from "react";
import { Header } from "./components/Header";

function App() {
  // Estado global
  const [presupuesto, setPresupuesto] = useState(0);
  const [esPresupuestoValido, setEsPresupuestoValido] = useState(false);

  // Establecer el nuevo presupuesto en el estado global
  const handleEstablecerPresupuesto = (nuevo_presupuesto) => {
    setPresupuesto(nuevo_presupuesto);
    setEsPresupuestoValido(true);
  }

  return (
    <Header handleEstablecerPresupuesto={handleEstablecerPresupuesto} esPresupuestoValido={esPresupuestoValido} />
  )
}

export default App

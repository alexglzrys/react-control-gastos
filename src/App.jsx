import { useState } from "react";
import { Header } from "./components/Header";

function App() {
  // Estado global
  const [presupuesto, setPresupuesto] = useState(0);

  // Establecer el nuevo presupuesto en el estado global
  const handleEstablecerPresupuesto = (nuevo_presupuesto) => {
    setPresupuesto(nuevo_presupuesto);
  }

  return (
    <Header handleEstablecerPresupuesto={handleEstablecerPresupuesto} />
  )
}

export default App

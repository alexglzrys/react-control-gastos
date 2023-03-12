import { NuevoPresupuesto } from "./NuevoPresupuesto"

export const Header = ({handleEstablecerPresupuesto, esPresupuestoValido}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        {esPresupuestoValido ? <p>Control de Presupuesto</p> : <NuevoPresupuesto handleEstablecerPresupuesto={handleEstablecerPresupuesto}/>}
    </header>
  )
}

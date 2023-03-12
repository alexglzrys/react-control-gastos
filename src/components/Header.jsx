import { NuevoPresupuesto } from "./NuevoPresupuesto"

export const Header = ({handleEstablecerPresupuesto}) => {
  return (
    <header>
        <h1>Planificador de Gastos</h1>
        <NuevoPresupuesto handleEstablecerPresupuesto={handleEstablecerPresupuesto}/>
    </header>
  )
}

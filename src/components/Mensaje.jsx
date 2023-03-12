export const Mensaje = ({ children, tipo }) => {
  // Este componente muesta un estilo diferente con base al tipo pasado como props
  return <div className={`alerta ${tipo}`}>{children}</div>;
};

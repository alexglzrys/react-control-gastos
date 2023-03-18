import CerrarModal from "../img/cerrar.svg";

export const Modal = ({ handleCerrarModal, animarModal }) => {
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="cerrar modal" onClick={handleCerrarModal} />
      </div>
      {/* Las transiciones de CSS manejadas con un setTimeOur, permiten mostrar animaciones sencillas sobre aplicaciones react con base al cambio en el estado */}
      <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>Nuevo Gasto</legend>
      </form>
    </div>
  );
};

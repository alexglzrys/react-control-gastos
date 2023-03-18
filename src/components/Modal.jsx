import CerrarModal from '../img/cerrar.svg';

export const Modal = ({handleCerrarModal}) => {
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={CerrarModal} alt="cerrar modal" onClick={handleCerrarModal} />
        </div>
    </div>
  )
}

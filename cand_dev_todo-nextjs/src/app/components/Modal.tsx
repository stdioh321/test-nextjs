import React from 'react'

interface ModalProps {
  modalOpen: boolean,
  setModalOpen: (toogle: boolean) => void,
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  function toggleModal(toggle = false) {
    setModalOpen(toggle)
  }

  return (
    <div>
      {!modalOpen ?
        <></>
        : <dialog className={`modal modal-open`}>
          <div className="modal-box">
            <p className="py-3">
              {children}
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={() => toggleModal(false)}>Close</button>
              </form>
            </div>
          </div>
        </dialog>}
    </div>
  )
};

export default Modal;

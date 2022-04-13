import { Component, ReactNode, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: ReactNode
  isOpen: boolean
}

const Modal = ({children ,isOpen}: ModalProps) => {
  const [modalStatus, setModalStatus] = useState < boolean > (false)



  useEffect(() => {
    if (isOpen !== modalStatus) {
      setModalStatus(isOpen)
    }
  }, [isOpen])



    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={e=> setModalStatus(false)}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
    );
  
};

export default Modal;

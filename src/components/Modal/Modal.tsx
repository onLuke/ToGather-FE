import React from 'react';
import Portal from '../../Portals/Portal';
import { Header, ModalBlock, Content, CloseButton } from './Modal.styles';

import logo from 'src/components/@icons/logo.png';

interface Props {
  children: React.ReactNode;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, openModal, setOpenModal }: Props) => {
  const handleCloseButton: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget === e.target) {
      setOpenModal(false);
    }
  };

  const modalClose = () => {
    setOpenModal(false);
  };

  window.addEventListener('keyup', (event) => {
    if (event.key !== 'Escape') return;
    setOpenModal(false);
  });

  return (
    <Portal>
      {openModal && (
        <ModalBlock onClick={handleCloseButton}>
          <Content>
            <Header>
              <img src="src/components/@icons/logo.png" alt="" width="50px" height="50px" />
              <CloseButton type="button" onClick={modalClose}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  tabIndex={1}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </CloseButton>
            </Header>
            {children}
          </Content>
        </ModalBlock>
      )}
    </Portal>
  );
};

export default Modal;

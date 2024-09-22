import { createContext, useState } from 'react';
import * as gt from '../types/global';

const initContext: gt.ModalContext = {
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
};

export const ModalContext = createContext(initContext);

export const ModalProvider = ({ children }: gt.ChildrenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const contextValue = { isOpen, openModal, closeModal };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

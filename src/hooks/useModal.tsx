import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import * as gt from '../types/global';

const useModal = (): gt.ModalContext => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('No ModalProvider!');
  return context;
};

export default useModal;

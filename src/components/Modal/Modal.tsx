import { ReactNode } from 'react';
import useModal from '../../hooks/useModal';
import s from './Modal.module.scss';

const Modal = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useModal();

  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <div className={s.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

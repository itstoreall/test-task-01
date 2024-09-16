import { ReactElement } from 'react';
import s from './Button.module.scss';

type ButtonProps = {
  content: string;
  onClick?: () => void;
  id?: string;
};

const Button = ({ content, onClick, id }: ButtonProps): ReactElement => (
  <button className={s.button} onClick={onClick} id={id}>
    {content}
  </button>
);

export default Button;

import { ReactElement } from 'react';
import s from './Button.module.scss';

type ButtonProps = {
  content: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
  id?: string;
};

const Button = (props: ButtonProps): ReactElement => {
  const { content, disabled = false, active = false, onClick, id } = props;

  const activeStyle = active ? s.active : '';
  const disableStyle = disabled ? s.disabled : '';
  const buttonStyle = `${s.button} ${activeStyle} ${disableStyle}`;

  return (
    <button className={buttonStyle} onClick={onClick} id={id}>
      {content}
    </button>
  );
};

export default Button;

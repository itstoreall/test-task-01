import { ReactElement } from 'react';
import s from './Input.module.scss';

type InputProps = {
  header: string;
  readOnly?: boolean;
  disabled?: boolean;
};

type InputType = (props: InputProps) => ReactElement;

const Input: InputType = ({ header, readOnly, disabled }) => {
  const disableStyle = disabled ? s.disabled : '';
  const readOnlyStyle = readOnly ? s.readOnly : '';
  const inputStyle = `${s.input} ${readOnlyStyle} ${disableStyle}`;

  return (
    <form className={s.inputForm}>
      <label className={s.label}>{header}</label>
      <input
        className={inputStyle}
        value={'Oleg Schevchenko'}
        disabled={disabled}
        readOnly={readOnly}
      />
    </form>
  );
};

export default Input;

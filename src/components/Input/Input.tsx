import { ReactElement } from 'react';
import s from './Input.module.scss';

type InputProps = {
  header: string | null;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
};

type InputType = (props: InputProps) => ReactElement;

const Input: InputType = props => {
  const { header, placeholder, value, onChange, readOnly, disabled } = props;

  const disableStyle = disabled ? s.disabled : '';
  const readOnlyStyle = readOnly ? s.readOnly : '';
  const inputStyle = `${s.input} ${readOnlyStyle} ${disableStyle}`;

  return (
    <form className={s.inputForm}>
      {header && <label className={s.label}>{header}</label>}
      <input
        className={inputStyle}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
      />
    </form>
  );
};

export default Input;

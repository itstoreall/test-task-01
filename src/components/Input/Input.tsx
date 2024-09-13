import { ReactElement } from 'react';
import s from './Input.module.scss';

type InputProps = {
  header: string;
};

type InputType = (props: InputProps) => ReactElement;

const Input: InputType = ({ header }) => {
  return (
    <form className={s.inputForm}>
      <label className={s.label}>{header}</label>
      <input className={s.input} value={'Oleg Schevchenko'} disabled />
    </form>
  );
};

export default Input;

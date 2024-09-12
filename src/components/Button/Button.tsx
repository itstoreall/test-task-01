import { ReactElement } from 'react';
import s from './Button.module.scss';

type ButtonType = (props: { content: string }) => ReactElement;

const Button: ButtonType = ({ content }) => (
  <button className={s.button}>{content}</button>
);

export default Button;

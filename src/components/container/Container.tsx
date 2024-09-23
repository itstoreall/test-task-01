import { ReactElement } from 'react';
import s from './Container.module.scss';

type ContainerProps = {
  label: 'page' | 'page-scroll';
  children: ReactElement;
};

type ContainerType = (props: ContainerProps) => ReactElement;

const Container: ContainerType = ({ label, children }) => {
  return <div className={`${s.container} ${s[label]}`}>{children}</div>;
};

export default Container;

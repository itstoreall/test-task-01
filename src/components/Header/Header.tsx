import { NavLink } from 'react-router-dom';
import Container from '../Container';
import Button from '../Button';
import s from './Header.module.scss';

const config = {
  button: {
    edit: { path: '/', content: 'Edit Users' },
    users: { path: '/users', content: 'Users' }
  }
};

const { edit, users } = config.button;

const NavButton = ({ path, content }: { path: string; content: string }) => (
  <NavLink to={path} className={({ isActive }) => (isActive ? s.active : '')}>
    <Button content={content} />
  </NavLink>
);

const Header = () => {
  return (
    <header className={s.header}>
      <Container label={'page'}>
        <nav className={s.navigation}>
          <NavButton path={edit.path} content={edit.content} />
          <NavButton path={users.path} content={users.content} />
        </nav>
      </Container>
    </header>
  );
};

export default Header;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/container';
import EditUser from './components/Pages/EditUserPage';
import Users from './components/Pages/UsersPage';
import s from './App.module.scss';

const config = {
  route: {
    edit: '/',
    users: '/users'
  }
};

const { edit, users } = config.route;

function App() {
  return (
    <BrowserRouter>
      <div className={s.app}>
        <Header />

        <Container label={'page'}>
          <Routes>
            <Route path={edit} element={<EditUser />} />
            <Route path={users} element={<Users />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;

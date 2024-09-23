import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { DataProvider } from './context/DataContext';
import Header from './components/Header';
import Container from './components/Container';
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
      <ModalProvider>
        <DataProvider>
          <div className={s.app}>
            <Header />

            <Container label={'page'}>
              <Container label={'page-scroll'}>
                <Routes>
                  <Route path={edit} element={<EditUser />} />
                  <Route path={users} element={<Users />} />
                </Routes>
              </Container>
            </Container>
          </div>
        </DataProvider>
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;

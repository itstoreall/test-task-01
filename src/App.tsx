import Header from './components/Header';
import s from './App.module.scss';
import Container from './components/container/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditUser from './components/Pages/EditUserPage';
import Users from './components/Pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <div className={s.app}>
        <Container label={'app'}>
          <>
            <Header />
            <Routes>
              <Route path='/' element={<EditUser />} />
              <Route path='/users' element={<Users />} />
            </Routes>
          </>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;

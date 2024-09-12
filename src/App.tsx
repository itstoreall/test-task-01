import Header from './components/Header';
import Main from './components/Main';
import s from './App.module.scss';
import Container from './components/container/Container';

function App() {
  return (
    <div className={s.app}>
      <Container label={'app'}>
        <>
          <Header />
          <Main />
        </>
      </Container>
    </div>
  );
}

export default App;

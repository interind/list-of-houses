import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import api from '../utils/api';
import Login from './Login';
import NavBar from './NavBar';
import Table from './Table';
import NotFound from './NotFound';

const App: React.FC = () => {
  const [title, setTitle] = React.useState<string>('');
  const [data, setData] = React.useState<any>([]);
  const loginHandler = (login: { email: string, password: string }) => api.authorizationPost(login)
    .then((user) => {
      const { data: dataUser } = user;
      const { token } = dataUser;
      localStorage.setItem('token', token.access);
      localStorage.setItem('email', login.email);
      setTitle(`Добро пожаловать! ${dataUser.firstName || 'Гость'}`);
      return Promise.resolve();
    })
    .catch((err) => console.error(err.message || 'ошибка авторизации'));

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      api.getInfoForUser(localStorage.getItem('token'))
        .then((info) => {
          setData(info.data);
        })
        .catch((err) => console.error(`ошибка апи ${err}`));
    }
  }, []);
  return (
    <div className="page">
      <header className="header">
        <NavBar />
      </header>
      <main className="content">
        <Switch>
          <Route exact path="/">
            <h1>{title || 'Список'}</h1>
            <Table data={data} />
          </Route>
          <Route exact path="/login">
            <Login loginHandler={loginHandler} />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </div>
  );
};

export default App;

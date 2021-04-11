import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

interface ILogin {
  loginHandler(login: { email: string, password: string }): Promise<void>;
}

const Login: React.FC<ILogin> = ({ loginHandler }) => {
  const history = useHistory();
  const [login, setLogin] = React.useState({ email: localStorage.getItem('email') || '', password: '' });
  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [evt.target.name]: evt.target.value });
  };

  const submitLogin = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    loginHandler(login)
      .then(() => history.push('/'));
  };

  return (
    <section className="login">
      <h2>Login</h2>
      <form onSubmit={submitLogin}>
        <input
          placeholder="логин"
          name="email"
          defaultValue={login.email}
          type="text"
          onChange={changeHandler}
        />
        <input
          placeholder="пароль"
          name="password"
          defaultValue={login.password}
          type="password"
          onChange={changeHandler}
        />
        <button
          type="submit"
          title="отправить"
        >
          отправить
        </button>
      </form>
    </section>
  );
};

Login.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default Login;

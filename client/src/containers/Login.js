import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import auth from '../services/auth';

const LoginPageWrapper = styled.div`
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
`;

const FormWrapper = styled.div`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const FormInput = styled.input`
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

const FormButton = styled.input`
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
`;

const Login = ({ isAdmin, setIsAdmin }) => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const handleChange = event => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await auth.login(login);
      setIsAdmin(true);
    } catch (error) {
      // TODO(carlos): show error message.
      console.error(`there was an error: ${error.message}`);
    }
  };

  if (isAdmin === true) {
    return <Redirect to={'/'} />;
  }

  return (
    <LoginPageWrapper>
      <FormWrapper>
        <form className="login-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="username"
            value={login.username}
            onChange={handleChange}
            size="20"
            placeholder="Uživatelké jméno"
          />
          <FormInput
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Heslo"
          />
          <p className="submit">
            <FormButton type="submit" value="Přihlásit" />
          </p>
        </form>
      </FormWrapper>
    </LoginPageWrapper>
  );
};

export default Login;

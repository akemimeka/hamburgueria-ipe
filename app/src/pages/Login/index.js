/* eslint-disable no-console */
import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { navigateAfterLogin } from '../../services';
import Button from '../../components/Button';
import Input from '../../components/InputText';
import Footer from '../../components/Footer';
import logo from '../../images/logo-circular-brown.png';

export default function Login() {
  const apiURL = 'https://lab-api-bq.herokuapp.com';
  const apiAuth = `${apiURL}/auth`;
  const history = useHistory();
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const authUser = (event) => {
    event.preventDefault();

    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailLogin,
        password: passwordLogin,
      }),
    };

    fetch(apiAuth, authOptions)
      .then((response) => response.json())
      .then((workerData) => {
        localStorage.setItem('currentUserName', workerData.name);
        localStorage.setItem('currentUserRole', workerData.role);
        localStorage.setItem('currentUserToken', workerData.token);
        return workerData.role;
      })
      .then((role) => navigateAfterLogin(history, role));
  };

  return (
    <Fragment>
      <main className='main-container-base'>
        <h1>
          <img className='logo-login' src={logo} alt='Logo Hamburgueria Ipê' />
        </h1>

        <div className='form-container-base form-container-signup-login'>
          <form onSubmit={authUser}>
            <Input
              divWrapClass='label-input-wrap'
              labelClass='label-for-input'
              labelText='E-mail'
              inputRequired
              inputType='email'
              inputValue={emailLogin}
              inputPlaceholder='Insira aqui seu e-mail'
              inputClass='input-text'
              inputOnChange={(event) => setEmailLogin(event.target.value)}
            />

            <Input
              divWrapClass='label-input-wrap'
              labelClass='label-for-input'
              labelText='Senha'
              inputRequired
              inputType='password'
              inputValue={passwordLogin}
              inputPlaceholder='Insira aqui sua senha'
              inputClass='input-text'
              inputOnChange={(event) => setPasswordLogin(event.target.value)}
            />

            <Button
              buttonType='submit'
              buttonClass='button-base button-centered bg-color-light-brown color-yellow'
              buttonText='Entrar'
            />
          </form>
        </div>

        <Link to="/cadastro">
          <Button
            buttonType='button'
            buttonClass='button-base bg-color-yellow color-brown'
            buttonText='Cadastre-se'
          />
        </Link>
      </main>

      <Footer />
    </Fragment>
  );
}

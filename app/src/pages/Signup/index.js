/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import logo from '../../images/logo-horizontal-brown.png';
import modalLogo from '../../images/logo-circular-brown.png';
import InputText from '../../components/InputText';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import InputRadio from '../../components/InputRadio';
import Header from '../../components/Header';

export default function Signup() {
  const apiURL = 'https://lab-api-bq.herokuapp.com';
  const apiUsers = `${apiURL}/users`;
  const [workerName, setWorkerName] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');
  const [workerRole, setWorkerRole] = useState('');
  const [workerPassword, setWorkerPassword] = useState('');
  const [workerConfirmPassword, setWorkerConfirmPassword] = useState('');
  const [equalPasswords, setEqualPasswords] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const registerUser = (event) => {
    event.preventDefault();

    if (workerPassword !== workerConfirmPassword) {
      setEqualPasswords(false);
    }

    if (workerPassword === workerConfirmPassword) {
      handleSubmit();
      setShowModal(true);
    }
  };

  const keyPress = useCallback((event) => {
    if (event.key === 'Escape' && showModal) {
      setShowModal(false);
    }
  }, [setShowModal, showModal]);

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress],
  );

  const handleSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: workerName,
        email: workerEmail,
        role: workerRole,
        restaurant: 'hamburgueria-ipe',
        password: workerPassword,
      }),
    };

    fetch(apiUsers, requestOptions)
      .then((response) => response.json())
      .then(() => setShowModal(true));
  };

  return (
    <Fragment>
      {showModal ? (
        <Modal
          modalSrc={modalLogo}
          buttonText='Clique aqui para fazer login'
          modalText='Seu cadastro foi realizado com sucesso!'
          onClose={() => setShowModal(false)}
        >
        </Modal>) : null}

      <Header
        headerClass='header-base bg-color-green'
        headerLogoLink='/'
        logoClass='logo-signup'
        logoSrc={logo}
        workAreaClass='header-title-base color-lightest'
        workAreaText='Cadastro'
        divLogoutClass='hidden'
      />
      <main className='main-container-base'>
        <div className='form-container-base form-container-signup-login' >
          <form onSubmit={registerUser}>
            <InputText
              divWrapClass='label-input-wrap'
              labelClass='label-for-input'
              labelText='Nome'
              inputRequired
              inputType='text'
              inputValue={workerName}
              inputMinLength='6'
              inputPlaceholder='Digite seu nome e sobrenome'
              inputClass='input-text'
              inputOnChange={(event) => setWorkerName(event.target.value)}
            />

            <InputText
              divWrapClass='label-input-wrap'
              labelClass='label-for-input'
              labelText='E-mail'
              inputRequired
              inputType='email'
              inputValue={workerEmail}
              inputMinLength='6'
              inputPlaceholder='Digite seu email'
              inputClass='input-text'
              inputOnChange={(event) => setWorkerEmail(event.target.value)}
            />

            <div className='label-input-wrap'>
              <p className='label-for-input'>Função</p>
              <div className='radio-buttons-wrap'>
                <InputRadio
                  inputClass='input-radio input-role'
                  inputId='role-hall'
                  inputName='role'
                  inputRequired
                  inputValue='hall'
                  inputChecked={workerRole === 'hall'}
                  inputOnChange={(event) => setWorkerRole(event.target.value)}
                  labelHtmlFor='role-hall'
                  labelClass='label-role button-base bg-color-green color-lightest'
                  labelText='Salão'
                />

                <InputRadio
                  inputClass='input-radio input-role'
                  inputId='role-kitchen'
                  inputName='role'
                  inputRequired
                  inputValue='kitchen'
                  inputChecked={workerRole === 'kitchen'}
                  inputOnChange={(event) => setWorkerRole(event.target.value)}
                  labelHtmlFor='role-kitchen'
                  labelClass='label-role button-base bg-color-green color-lightest'
                  labelText='Cozinha'
                />
              </div>
            </div>

            <InputText
              divWrapClass='label-input-wrap'
              labelClass='label-for-input'
              labelText='Senha'
              inputRequired
              inputType='password'
              inputMinLength='6'
              inputPlaceholder='Digite a senha'
              inputClass='input-text'
              inputOnChange={(event) => setWorkerPassword(event.target.value)}
            />

            <InputText
              labelClass='label-for-input'
              labelText='Confirmar Senha'
              inputRequired
              inputType='password'
              inputPlaceholder='Confirmar senha'
              inputClass='input-text'
              inputOnChange={(event) => setWorkerConfirmPassword(event.target.value)}
            />

            {
              !equalPasswords && <p className='msg-different-passwords'>
                As senhas são diferentes. Tente novamente.
              </p>
            }

            <Button
              buttonType='submit'
              buttonClass='button-base button-centered mg-top-2 bg-color-light-brown color-yellow'
              buttonText='Cadastrar'
              OnClick={(event) => handleSubmit(event.target.value)}
            />

          </form>
        </div>

        <Link to="/">
          <Button
            buttonType='button'
            buttonClass='button-base bg-color-yellow color-brown'
            buttonText='Voltar'
          />
        </Link>
      </main>

      <Footer />
    </Fragment >
  );
}

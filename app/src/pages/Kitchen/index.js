import React, { Fragment } from 'react';
import Header from '../../components/Header';
import logo from '../../images/logo-horizontal.png';

export default function Kitchen() {
  return (
    <Fragment>
      <Header
        headerClass='header-base bg-color-light-brown'
        headerLink='/'
        logoSrc={logo}
        workAreaClass='header-title-base color-lightest'
        workAreaText='Cozinha'
        divLogoutClass='align-right weight-500'
        workerRoleClass='header-role-base color-lightest'
        workerRoleText={'Chef'}
        workerNameClass='header-name-base color-lightest'
        workerNameText={'Jussara Silva'}
        buttonLogoutClass='button-logout-base bg-color-green color-lightest'
        buttonLogoutOnClick={''}
      />
    </Fragment>
  );
}
import React from "react";
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import { screen } from '@testing-library/react';
import Login from '../pages/Login'
import userEvent from "@testing-library/user-event";

export const VALID_EMAIL = 'alguem@email.com';
export const VALID_PASSWORD = '123456';
export const INVALID_EMAIL_0 = 'email';
export const INVALID_EMAIL_1 = 'email@com@';
export const INVALID_EMAIL_2 = 'emailcom@';
export const INVALID_EMAIL_3 = 'alguem@email.';
export const INVALID_PASSWORD = '23456';

describe('Login', () => {
  test('testa login', () => {
    renderWithRouterAndRedux(<Login />)
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveTextContent('');
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveTextContent('');
    const btnLogin = screen.getByTestId('button-login');
    expect(btnLogin).toBeInTheDocument();
    userEvent.type(emailInput, VALID_EMAIL)
    userEvent.type(passwordInput, INVALID_PASSWORD)
    userEvent.click(btnLogin)
    expect(btnLogin.disabled).toBeTruthy()
    userEvent.type(emailInput, VALID_EMAIL)
    userEvent.type(passwordInput, VALID_PASSWORD)
    userEvent.click(btnLogin)
    expect(btnLogin.disabled).toBeFalsy()
  });
})
import React from "react";
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import { screen } from '@testing-library/react';
import Header from '../components/Header'
import { currencies, mockExpense } from './helpers/mockData';

const INITIAL_STATE = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies: currencies,
    expenses: mockExpense,
    editor: false,
    idToEdit: 0,
  },
};

describe('Header', () => {
  test('testa header', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE });
    const user = screen.getByTestId('email-field');
    expect(user).toBeInTheDocument();
    expect(user).toHaveTextContent('teste@teste.com');
    const total = screen.getByTestId('total-field');
    expect(total).toBeDefined();
    expect(total).toHaveTextContent('384,89');
    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeDefined();
    expect(currency).toHaveTextContent('BRL');
  });
})
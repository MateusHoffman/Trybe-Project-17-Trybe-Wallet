import React from "react";
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import { screen } from '@testing-library/react';
import Table from '../components/Table'
import { currencies, mockExpense, mockData } from './helpers/mockData';
import userEvent from "@testing-library/user-event";

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

describe('WalletForm', () => {
  test('testa WalletForm', () => {
    renderWithRouterAndRedux(<Table />, { initialState: INITIAL_STATE });

    const btnDelet = screen.getAllByTestId('delete-btn');
    expect(btnDelet).toHaveLength(2);

    const btnEdit = screen.getAllByTestId('edit-btn');
    expect(btnEdit).toHaveLength(2);

    userEvent.click(btnDelet[0])

    expect(screen.getAllByTestId('delete-btn')).toHaveLength(1);
    expect(screen.getAllByTestId('edit-btn')).toHaveLength(1);

    userEvent.click(screen.getByTestId('edit-btn'))
  });
})
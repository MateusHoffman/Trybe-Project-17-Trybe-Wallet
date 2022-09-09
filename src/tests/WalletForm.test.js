import React from "react";
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import { screen } from '@testing-library/react';
import WalletForm from '../components/WalletForm'
import Wallet from '../pages/Wallet'
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
    renderWithRouterAndRedux(<WalletForm />, { initialState: INITIAL_STATE });

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveTextContent('');
    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveTextContent('');
    const currencyInput = screen.getByTestId('currency-input');
    expect(currencyInput).toBeInTheDocument();
    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();
    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();
    const btnAddExpense = screen.getByRole('button', {name: /Adicionar despesa/i});
    expect(btnAddExpense).toBeInTheDocument();
    
    userEvent.type(valueInput, '10')
    userEvent.type(descriptionInput, 'teste1')
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(btnAddExpense)
    
    userEvent.selectOptions(currencyInput, 'BTC')
    expect(screen.getByText('BTC').selected).toBeTruthy()
  
    userEvent.selectOptions(methodInput, 'Cartão de débito')
    expect(screen.getByText('Cartão de débito').selected).toBeTruthy()
  
    userEvent.selectOptions(tagInput, 'Trabalho')
    expect(screen.getByText('Trabalho').selected).toBeTruthy()
  });

  test('edit', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, '1');
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0]);
    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, '2');
    userEvent.selectOptions(currencyInput, 'USD')
    userEvent.selectOptions(methodInput, 'Cartão de débito')
    userEvent.selectOptions(tagInput, 'Trabalho')
    
    expect(screen.getByRole('button', { name: 'Editar despesa' })).toBeInTheDocument();
    
    userEvent.click(screen.getByRole('button', { name: 'Editar despesa' }));
    
    expect(await screen.findByRole('cell', { name: '2.00' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '2' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Cartão de débito' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
  })
  
  test('testa inputs btn add', async () => {
    renderWithRouterAndRedux(<Wallet />);
    
    
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    
    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, '1');
    userEvent.selectOptions(currencyInput, 'USD')
    userEvent.selectOptions(methodInput, 'Cartão de débito')
    userEvent.selectOptions(tagInput, 'Trabalho')
    userEvent.click(screen.getByRole('button', { name: 'Adicionar despesa' }));

    expect(await screen.findByRole('cell', { name: '1.00' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: '1' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Cartão de débito' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Trabalho' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Real' })).toBeInTheDocument();
  })
})
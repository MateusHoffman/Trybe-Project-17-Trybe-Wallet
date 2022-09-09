import React from "react";
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet'

describe('Login', () => {
  test('testa login', () => {
    renderWithRouterAndRedux(<Wallet />)
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
  });
})
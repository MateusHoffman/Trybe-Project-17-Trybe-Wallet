import React from "react";
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App'


describe('App', () => {
  test('testa App', () => {
    renderWithRouterAndRedux(<App />)
  });
})
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciesAPI from '../services/requestAPI';
import {
  submitExpenses as submitExpensesAction,
  submitAllValue as submitAllValueAction,
  submitArrExpenses as submitArrExpensesAction,
  fetchCurrency,
} from '../redux/actions/index';
import './Header.css'

const ALIMENTACAO = 'Alimentação';
class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: ALIMENTACAO,
    sumAllExpenses: 0,
  }

  componentDidMount = () => {
    this.requestAPI();
  }

  requestAPI = async () => {
    const { submitCurrenciesApi } = this.props;
    await submitCurrenciesApi();
  }

  fetchCurrencyCurrent = async () => {
    const response = await currenciesAPI();
    delete response.USDT;
    return response;
  }

  handleSubmitForm = async (event) => {
    event.preventDefault();
    const { submitExpenses, expenses, submitAllValue } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
      sumAllExpenses,
    } = this.state;
    const exchangeCurrent = await this.fetchCurrencyCurrent();
    const objExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchangeCurrent,
    };
    submitExpenses(objExpense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
    const numberValue = Number(value);
    const exchange = exchangeCurrent[currency].ask;
    const valueBRL = exchange * numberValue;
    const allValue = sumAllExpenses + valueBRL;
    submitAllValue(allValue);
    this.setState({ sumAllExpenses: allValue });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmitFormEdit = async (event) => {
    event.preventDefault();
    const { expenses, idToEdit, submitArrExpenses } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expenseCurrent = expenses.find((e) => e.id === idToEdit);
    const expenseEdit = {
      value,
      description,
      currency,
      method,
      tag,
      id: idToEdit,
      exchangeRates: expenseCurrent.exchangeRates,
    };
    const arrDeleteExpense = expenses.filter((e) => e.id !== idToEdit);
    submitArrExpenses(arrDeleteExpense);
    const newArrExpenses = [...arrDeleteExpense, expenseEdit];
    submitArrExpenses(newArrExpenses.sort((a, b) => a.id - b.id));
  }

  render() {
    const { currencies, editor } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <section className='wallet-form'>
        <form>
          <label htmlFor="value" className='wallet-label'>
            <input
              className='field-wallet'
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              placeholder="Digite um valor..."
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            <input
              className='field-wallet'
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              placeholder="Digite uma descrição..."
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            <select
              className='field-wallet'
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {
                currencies.map((elCurrency, index) => (
                  <option key={ index }>{elCurrency}</option>
                ))
              }
              {/* <option>BRL</option> */}
            </select>
          </label>
          <label htmlFor="method">
            <select
              className='field-wallet'
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              className='field-wallet'
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
            <button
              className='field-wallet'
              type="submit"
              onClick={ editor ? this.handleSubmitFormEdit : this.handleSubmitForm }
            >
              { editor ? 'Editar despesa' : 'Adicionar despesa' }
            </button>
        </form>
      </section>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  submitCurrenciesApi: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  allValueBRL: state.wallet.allValueBRL,
});

const mapDispatchToProps = (dispatch) => ({
  submitCurrenciesApi: () => (
    dispatch(fetchCurrency())),
  submitExpenses: (objExpense) => (
    dispatch(submitExpensesAction(objExpense))),
  submitAllValue: (allValueBRL) => (
    dispatch(submitAllValueAction(allValueBRL))),
  submitArrExpenses: (newArrExpenses) => (
    dispatch(submitArrExpensesAction(newArrExpenses))),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

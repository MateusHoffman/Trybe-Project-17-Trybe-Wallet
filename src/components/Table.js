import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  submitArrExpenses as submitArrExpensesAction,
  editExpense as editExpenseAction,
} from '../redux/actions/index';
import './Table.css'
import editIcon from '../img/editar.png'
import deleteIcon from '../img/delete.png'

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, submitArrExpenses } = this.props;
    const newArrExpenses = expenses.filter((e) => e.id !== id);
    submitArrExpenses(newArrExpenses);
  }

  render() {
    const { expenses, editExpense } = this.props;
    return (
      <section className='section-table'>
        <section className='scroll'>
        <table className='table'>
          <thead>
            <tr>
              <th className='align-middle'>Descrição</th>
              <th className='align-middle'>Tag</th>
              <th className='align-middle'>Método de pagamento</th>
              <th className='align-middle'>Valor</th>
              <th className='align-middle'>Moeda</th>
              <th className='align-middle'>Câmbio utilizado</th>
              <th className='align-middle'>Valor convertido</th>
              <th className='align-middle'>Moeda de conversão</th>
              <th className='align-middle'>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((e) => {
                const current = Object.values(e.exchangeRates !== undefined
                  && e.exchangeRates).find((coin) => coin.code === e.currency);
                return (
                  <tr key={ e.id }>
                    <td className='align-middle'>{e.description}</td>
                    <td className='align-middle'>{e.tag}</td>
                    <td className='align-middle'>{e.method}</td>
                    <td className='align-middle'>{Number(e.value).toFixed(2)}</td>
                    <td className='align-middle'>{current.name}</td>
                    <td className='align-middle'>{Number(current.ask).toFixed(2)}</td>
                    <td className='align-middle'>{(Number(current.ask) * e.value).toFixed(2)}</td>
                    <td className='align-middle'>Real</td>
                    <td className='align-middle btn-edit-trash'>
                      <button
                        className='trash'
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.deleteExpense(e.id) }
                      >
                      <img
                        src={ deleteIcon }
                        alt="Delete"
                      />
                        {/* Excluir */}
                      </button>
                      <button
                        className='edit'
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => editExpense(e.id) }
                      >
                      <img
                        src={ editIcon }
                        alt="Edit"
                      />
                        {/* Editar */}
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        </section>
      </section>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  allValueBRL: state.wallet.allValueBRL,
});

const mapDispatchToProps = (dispatch) => ({
  submitArrExpenses: (newArrExpenses) => (
    dispatch(submitArrExpensesAction(newArrExpenses))),
  editExpense: (id) => (
    dispatch(editExpenseAction(id))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

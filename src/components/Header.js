import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css'

class Header extends Component {
  componentDidMount = () => {
  }

  allValue = () => {
    const { expenses } = this.props;
    const values = expenses.map((e) => {
      const arrExchange = Object.entries(e.exchangeRates);
      const currencyCurrent = arrExchange.find((el) => el[0] === e.currency);
      return Number(e.value) * Number(currencyCurrent[1].ask);
    });
    return values.reduce((partialSum, a) => partialSum + a, 0);
  }

  render() {
    const { email } = this.props;
    return (
      <section className='header'>
        <div>
          <p data-testid="total-field">
            {
              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(this.allValue().toFixed(2)).substring(3)
            }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <p data-testid="email-field">{email}</p>
        {/* <p data-testid="email-field">mateushoffman@gmail.com</p> */}
      </section>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  allValueBRL: state.wallet.allValueBRL,
});

export default connect(mapStateToProps)(Header);

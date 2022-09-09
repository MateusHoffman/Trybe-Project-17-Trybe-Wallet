import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css'

class Wallet extends React.Component {
  render() {
    return (
      <section className='page-wallet'>
        <section className='section-header'>
          <Header />
          <WalletForm />
        </section>
        <Table />
      </section>
    );
  }
}

export default Wallet;

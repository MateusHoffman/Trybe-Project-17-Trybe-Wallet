import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitEmail as submitEmailAction } from '../redux/actions/index';
import './Login.css'

const PASSWORD_LENGTH = 5;
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    submitFormDisabled: true,
  }

  handleChange = (event) => {
    const { email, password } = this.state;
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
    if (email.includes('@')
      && email.includes('.com')
      && password.length >= PASSWORD_LENGTH
    ) {
      this.setState({ submitFormDisabled: false });
    } else {
      this.setState({ submitFormDisabled: true });
    }
  }

  handleSubmitForm = () => {
    const { submitEmail } = this.props;
    const { email } = this.state;
    submitEmail(email);
  }

  render() {
    const { email, password, submitFormDisabled } = this.state;
    return (
      <section className='page-login'>
        <form method="POST" className='form-login'>
          <h1>Sign In</h1>
          <label htmlFor="email">
            <input
              className='field-login'
              type="email"
              name="email"
              id="email"
              value={ email }
              placeholder="Email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              className='field-login'
              type="password"
              name="password"
              id="password"
              value={ password }
              placeholder="Password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/carteira" className='link-login'>
            <button
              className='field-login btn-login'
              data-testid="button-login"
              type="submit"
              disabled={ submitFormDisabled }
              onClick={ this.handleSubmitForm }
            >
              Sign In
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  submitEmail: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (param) => (
    dispatch(submitEmailAction(param))),
});

export default connect(null, mapDispatchToProps)(Login);

import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addName } from '../actions';

class Login extends React.Component {
    state = {
      email: '',
      name: '',
    //   isButtonDisabled: true,
    }

    // handleChange para ver os inputs
    handleChange = ({ target: { value, name } }) => {
      this.setState({ [name]: value });
    }

    validateBtn = () => {
      const { email, name } = this.state;
      let validation = true;
      if (email.length !== 0 && name.length !== 0) {
        validation = false;
      }
      return validation;
    }

    render() {
      const { name, email } = this.state;
      return (
        <form>
          <input
            type="text"
            placeholder="name"
            data-testid="input-player-name"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            placeholder="email"
            data-testid="input-gravatar-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.validateBtn() }
          >
            Play
          </button>
        </form>
      );
    }
}

export default connect()(Login);

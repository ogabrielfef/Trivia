import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
    state = {
      email: '',
      name: '',
    }

    // onclick para fazer a requisição à API
    handleClick = async () => {
      const { history } = this.props;
      const apiData = await fetch('https://opentdb.com/api_token.php?command=request');
      const response = await apiData.json();
      const { token } = response;
      localStorage.setItem('token', token);
      history.push('/game');
    };

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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      );
    }
}

// const mapDispatchToProps = (dispatch) => ({
//   fetchToken: (email, name) => { dispatch(fetchTriviaUrlThunk(email, name)); },
// });

// const mapStateToProps = (state) => ({
//   gravatarEmail: state.player.gravatarEmail,
// });

Login.propTypes = {
//   fetchToken: PropTypes.func.isRequired,
//   gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
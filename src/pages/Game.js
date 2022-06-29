import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  state = {
    responseAPI: '',
  }

  componentDidMount() {
    const ONE_MINUTE = 60000;
    this.triviaApiRequest();
    setTimeout(this.tokenHasExpired, ONE_MINUTE);
  }

  triviaApiRequest = async () => {
    const token = localStorage.getItem('token');
    const apiData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await apiData.json();
    this.setState({ responseAPI: response });
    console.log(response);
    return response;
  };

  // caso token seja inválido
  tokenHasExpired = () => {
    const { responseAPI } = this.state;
    const { history } = this.props;
    const logOut = {
      response_code: 3,
      results: [],
    };
    if (responseAPI === logOut) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      history.push('/');
    }
  }

  // // handle click respostas
  // handleClick = () => {
  //   const { responseAPI } = this.state;
  //   responseAPI.map((array, index) => {

  //   });
  // }

  render() {
    const { gravatarEmail } = this.props;
    const { responseAPI } = this.state;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="seu gravatar"
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          />
          <p
            data-testid="header-player-name"
          >
            { localStorage.getItem('name') }

          </p>
          <p
            data-testid="header-score"
          >
            Placar: 0

          </p>
        </header>
        <section>
          { responseAPI.results.map((array, index) => (<h2 data-testid="question-text" key={ index }>{ array.category }</h2>))}
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);

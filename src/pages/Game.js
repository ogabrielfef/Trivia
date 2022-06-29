import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    const { gravatarEmail, name } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="seu gravatar"
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
        />
        <p
          data-testid="header-player-name"
        >
          {name}

        </p>
        <p
          data-testid="header-score"
        >
          Placar: 0

        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
};

export default connect(mapStateToProps)(Game);

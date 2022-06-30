import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MINIMUM_SCORE = 3;

class Feedback extends React.Component {
  render() {
    const { score, gravatar } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="seu gravatar"
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
        />
        <p
          data-testid="header-player-name"
        >
          {localStorage.getItem('name')}

        </p>
        <p
          data-testid="header-score"
        >
          {score}
        </p>
        {
          score >= MINIMUM_SCORE ? (
            <p data-testid="feedback-text">Well Done!</p>
          ) : <p data-testid="feedback-text">Could be better...</p>
        }

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  gravatar: state.player.gravatarEmail,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  gravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);

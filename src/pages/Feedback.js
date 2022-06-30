import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MINIMUM_SCORE = 3;

class Feedback extends React.Component {
  render() {
    const { score, gravatar, assertions } = this.props;
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
        <p
          data-testid="feedback-total-score"
        >
          {score}
        </p>
        <p
          data-testid="feedback-total-question"
        >
          {assertions}
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
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  gravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MINIMUM_SCORE = 3;

class Feedback extends React.Component {
  render() {
    const { score } = this.props;
    return (
      <section>
        {/* Inserir header aqui */}
        {
          score >= MINIMUM_SCORE ? (
            <p data-testid="feedback-text">Well Done!</p>
          ) : <p data-testid="feedback-text">Could be better...</p>
        }

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);

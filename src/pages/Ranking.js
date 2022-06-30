import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// const MINIMUM_SCORE = 3;

class Ranking extends React.Component {
  render() {
    // const { score, gravatar, assertions } = this.props;
    return (
      <>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Go to home page
          </button>
        </Link>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   score: state.player.score,
//   name: state.player.name,
//   gravatar: state.player.gravatarEmail,
//   assertions: state.player.assertions,
// });

// Feedback.propTypes = {
//   score: PropTypes.number.isRequired,
//   assertions: PropTypes.number.isRequired,
//   gravatar: PropTypes.string.isRequired,
// };

// export default connect(mapStateToProps, null)(Ranking);
export default Ranking;

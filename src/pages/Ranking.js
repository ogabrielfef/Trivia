import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetScore } from '../actions';

// const MINIMUM_SCORE = 3;

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const savedRank = JSON.parse(localStorage.getItem('ranking'));
    // const key = 'index';
    // savedRank.forEach((item, index) => { item[key] = index; });
    savedRank.sort((a, b) => b.score - a.score);
    console.log(savedRank);
    this.setState({ ranking: savedRank });
  }

  render() {
    const { resetScoreButton } = this.props;
    const { ranking } = this.state;
    return (
      <>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <section>
          <ol>
            {
              ranking.map((item, index) => (
                <li key={ index }>
                  <p data-testid={ `player-name-${index}` }>{item.name}</p>
                  <p data-testid={ `player-score-${index}` }>{item.score}</p>
                </li>
              ))
            }
          </ol>
        </section>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ resetScoreButton }
          >
            Go to home page
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetScoreButton: () => { dispatch(resetScore()); },
});

Ranking.propTypes = {
  resetScoreButton: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);

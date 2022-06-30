import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends React.Component {
  state = {
    responseAPI: [],
    indexQuestion: 0,
    responseCode: 0,
  }

  componentDidMount() {
    const TWO_SECONDS = 2000;
    this.triviaApiRequest();
    setTimeout(this.tokenHasExpired, TWO_SECONDS);
  }

  triviaApiRequest = async () => {
    const token = localStorage.getItem('token');
    const apiData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await apiData.json();
    return this.setState({
      responseAPI: response.results,
      responseCode: response.response_code,
    });
  };

  // caso token seja inválido
  tokenHasExpired = () => {
    const { responseCode } = this.state;
    const { history } = this.props;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      history.push('/');
    }
  }

  randomizeQuestions = (wrong, right) => {
    const newWrong = [];
    wrong.map((item, index) => {
      const obj = {
        answer: item,
        index,
      };
      return newWrong.push(obj);
    });
    const arrayToSort = [right, ...newWrong];
    // Fonte: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const shuffled = arrayToSort
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled;
  }

  render() {
    const { gravatarEmail } = this.props;
    const { responseAPI, indexQuestion } = this.state;
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
          {responseAPI.length > 0 && (
            <div>
              <h1 data-testid="question-category">
                {' '}
                {responseAPI[indexQuestion].category}
                {' '}
              </h1>
              <p data-testid="question-text">
                {' '}
                {responseAPI[indexQuestion].question}
                {' '}
              </p>

              <div data-testid="answer-options">
                {
                  this.randomizeQuestions(responseAPI[indexQuestion].incorrect_answers,
                    responseAPI[indexQuestion].correct_answer)
                    .map((item, index) => (

                      item === responseAPI[indexQuestion].correct_answer ? (
                        <button
                          key={ index }
                          data-testid="correct-answer"
                          type="button"
                        >
                          {responseAPI[indexQuestion].correct_answer}
                        </button>
                      ) : (
                        <button
                          type="button"
                          key={ item.index }
                          data-testid={ `wrong-answer-${item.index}` }
                        >
                          {item.answer}
                        </button>
                      )

                    ))
                }
              </div>
            </div>
          )}
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

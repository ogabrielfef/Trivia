import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from '../components/Timer';
import { nextQuestionAction, pointScore, disableOptionsFalse } from '../actions/index';

const FOUR = 4;
const DEFAULT_BORDER = '3px solid black';

class Game extends React.Component {
  state = {
    responseAPI: [],
    indexQuestion: 0,
    responseCode: 0,
    stylesAns: {
      correctAns: {
        border: DEFAULT_BORDER,
      },
      wrongAns: {
        border: DEFAULT_BORDER,
      },
    },
  }

  componentDidMount() {
    const TWO_SECONDS = 2000;
    this.triviaApiRequest();
    setTimeout(this.tokenHasExpired, TWO_SECONDS);
  }

  handleAnswerClick = ({ target: { name } }) => {
    const { nextQuest, countPoint } = this.props;
    this.setState({
      stylesAns: {
        correctAns: {
          border: '3px solid rgb(6, 240, 15)',
        },
        wrongAns: {
          border: '3px solid red',
        },
      },
    });
    nextQuest();
    if (name === 'correct-ans') {
      countPoint();
    }
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

  handleNextClick = () => {
    const { disableButtonFalse } = this.props;
    this.setState((prevState) => ({ indexQuestion: prevState.indexQuestion + 1 }));
    disableButtonFalse();
    this.setState({
      stylesAns: {
        correctAns: {
          border: DEFAULT_BORDER,
        },
        wrongAns: {
          border: DEFAULT_BORDER,
        },
      },
    });
  }

  render() {
    const { gravatarEmail, nextQuestion, placar, disableButton, history } = this.props;
    const { responseAPI, indexQuestion, stylesAns } = this.state;
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
            {localStorage.getItem('name')}

          </p>
          <p
            data-testid="header-score"
          >
            {placar}
          </p>
        </header>
        <section>
          {responseAPI.length > 0 && (

            <div className="question-info">
              <h1 data-testid="question-category">
                {responseAPI[indexQuestion].category}
              </h1>

              <p data-testid="question-text">
                {responseAPI[indexQuestion].question}
              </p>
              <div data-testid="answer-options">
                <Timer />
                {
                  this.randomizeQuestions(responseAPI[indexQuestion].incorrect_answers,
                    responseAPI[indexQuestion].correct_answer)
                    .map((item) => (

                      item === responseAPI[indexQuestion].correct_answer ? (
                        <button
                          key="correct-ans"
                          style={ stylesAns.correctAns }
                          className="button-correct-ans"
                          data-testid="correct-answer"
                          type="button"
                          name="correct-ans"
                          disabled={ disableButton }
                          onClick={ this.handleAnswerClick }
                        >
                          {responseAPI[indexQuestion].correct_answer}
                        </button>
                      ) : (
                        <button
                          type="button"
                          key={ item.index }
                          style={ stylesAns.wrongAns }
                          disabled={ disableButton }
                          className="button-correct-ans"
                          data-testid={ `wrong-answer-${item.index}` }
                          onClick={ this.handleAnswerClick }
                        >
                          {item.answer}
                        </button>
                      )
                    ))
                }
                {
                  nextQuestion ? (
                    <button
                      data-testid="btn-next"
                      type="button"
                      onClick={ indexQuestion === FOUR ? history.push('/feedback')
                        : this.handleNextClick }
                    >
                      Próxima
                    </button>
                  ) : ''
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
  nextQuestion: state.player.nextQuestion,
  placar: state.player.score,
  disableButton: state.player.disableOptions,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuest: () => { dispatch(nextQuestionAction()); },
  countPoint: () => { dispatch(pointScore()); },
  disableButtonFalse: () => { dispatch(disableOptionsFalse()); },
});

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.bool.isRequired,
  nextQuest: PropTypes.func.isRequired,
  countPoint: PropTypes.func.isRequired,
  placar: PropTypes.number.isRequired,
  disableButton: PropTypes.bool.isRequired,
  disableButtonFalse: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

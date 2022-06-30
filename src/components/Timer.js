import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { disableOptionsTrue, nextQuestionAction } from '../actions/index';

const ONE_SECOND = 1000;
const THIRTY_SECONDS = 30000;

class Timer extends React.Component {
  state = {
    seconds: 30,
  }

  componentDidMount() {
    this.timer();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timer = () => {
    const { disableButtonAction, nextQuest } = this.props;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
    setTimeout(() => {
      clearInterval(this.intervalId);
      disableButtonAction();
      nextQuest();
    }, THIRTY_SECONDS);
  }

  render() {
    const { seconds } = this.state;
    return (
      <h2>{seconds}</h2>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  disableButtonAction: () => { dispatch(disableOptionsTrue()); },
  nextQuest: () => { dispatch(nextQuestionAction()); },
});

Timer.propTypes = {
  disableButtonAction: PropTypes.func.isRequired,
  nextQuest: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);

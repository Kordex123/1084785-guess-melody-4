import React, {PureComponent} from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import PropTypes from 'prop-types';
import {BrowserRouter} from "react-router-dom";
import {Switch, Route} from "react-router";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import {GameType} from "../../game-type";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
    // this.renderGameScreen = this.renderGameScreen.bind(this);
  }

  renderGameScreen() {
    const {errorCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorCount={errorCount}
          onWelcomeButtonClick={() => {
            this.setState({
              step: 0,
            });
          }}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <ArtistQuestionScreen
              question={question}
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1}));
              }}
            />
          );
        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              question={question}
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
            />
          );
      }
    }
    return null;
  }

  render() {
    const {questions} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderGameScreen()}
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreen
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired
};



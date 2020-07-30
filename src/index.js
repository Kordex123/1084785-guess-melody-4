import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import questions from "./mocks/questions";

const init = () => {
  const Settings = {
    // gameTime: 5,
    ERRORS_COUNT: 3,
  };

  ReactDOM.render(<App
    errorCount={Settings.ERRORS_COUNT}
    questions={questions}
  />, document.getElementById(`root`));
};

init();


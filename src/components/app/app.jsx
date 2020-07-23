import React from 'react';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import PropTypes from 'prop-types';

const welcomeButtonHandler = () => {};

const App = (props) => {
  const {errorCount} = props;
  return (
    <WelcomeScreen
      // time={gameTime}
      errorCount={errorCount}
      onWelcomeButtonClick={welcomeButtonHandler}
    />
  );
};

App.propTypes = {
  errorCount: PropTypes.number.isRequired
};

export default App;

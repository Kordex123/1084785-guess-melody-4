import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer.
    create(<WelcomeScreen
      errorCount={8}
      onWelcomeButtonClick={() => {}}
    />).
    toJSON();
  expect(tree).toMatchSnapshot();
});

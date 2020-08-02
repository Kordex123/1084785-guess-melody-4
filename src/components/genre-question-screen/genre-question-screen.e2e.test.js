import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from "./genre-question-screen.jsx";

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
        genre: `country`,
      },
      {
        src: `https://www.youtube.com/watch?v=r5EXKDlf44M`,
        genre: `rock`,
      },
      {
        src: `https://www.youtube.com/watch?v=hTWKbfoikeg`,
        genre: `rock`,
      },
      {
        src: `https://www.youtube.com/watch?v=IZKBa6bvUjo`,
        genre: `rap`,
      }
    ]
  }
};

it(`When user answers genre question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const genreQuestion = shallow(<GenreQuestionScreen
    onAnswer={onAnswer}
    question={question}
  />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const {question} = mock;
  const onAnswer = jest.fn((...args) => [...args]);
  const userAnswer = [false, true, false, false];
  // const userAnswer = [false, false, false, false];

  const genreQuestion = shallow(<GenreQuestionScreen
    onAnswer={onAnswer}
    question={question}
  />);
  const form = genreQuestion.find(`form`);
  const inputTwo = genreQuestion.find(`input`).at(1);

  inputTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, {preventDefault() {}});

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswer.mock.calls[0][1]).toMatchObject(userAnswer);

  expect(
      genreQuestion.find(`input`).map((it) => it.prop(`checked`))
  ).toEqual(userAnswer);
});

import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/Login';
import renderer from 'react-test-renderer';

describe('Login', () => {
  let wrapper = mount(<Login />);


  // test('is a stateful class component.', () => {
  //   expect(React.Component.isPrototypeOf(Login)).toBe(true);
  // });

  test('contains a form for entering the users credentials.', () => {
    expect(wrapper.contains(<form>)).toEqual(true)
  });

  test('should call `handleSubmit` when button is clicked.', () => {
    expect(handleSubmit.called).toBe(true)
  });

  test('one plus one equals two', () => {
    expect(1 + 1).toBe(2)
  });


});


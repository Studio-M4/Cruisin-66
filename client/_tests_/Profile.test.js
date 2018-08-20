import Profile from '../component/Profile.js';
import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, render, mount } from 'enzyme';

describe('Profile component', () => {
  // it('Profile: renders correctly', () => {
  //   const props = { selectedIndex: 0, user: {}}
  //   const navigation = { navigate: jest.fn() };
  //   const tree = renderer.create(<Profile navigation={navigation}  {...props}/> ).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });


  //error because 
  it('Profile: renders correctly', () => {
    const wrapper = shallow (<Profile/>)
    expect (wrapper).toMatchSnapshot();
  });
});

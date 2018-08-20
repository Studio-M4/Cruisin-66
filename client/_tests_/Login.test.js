import React, { View, TouchableNativeFeedback, TextInput, Text} from 'react-native';
import { shallow } from 'enzyme';
import Login from '../component/Login.js';
import {NativeModules} from 'react-native'

//testing, currently getting this error:
//TypeError: _reactNative.default.createElement is not a function

function sum(a, b) {
    return a + b;
  }
  
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });


describe('<Login />', () => {

    beforeEach(() => {
        NativeModules.TestModule = { test: jest.fn() } 
      });
    
    it('should be a view component', () => {
        const wrapper = shallow(<Login/>)
        expect(wrapper.type()).to.equal(View);
    });
     
    it ('renders two text inputs', () => {
        const wrapper = shallow(<Login/>)
        expect(wrapper.find(TextInput)).to.have.length(2)
    })  
});

     



    
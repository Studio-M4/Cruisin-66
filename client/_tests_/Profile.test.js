import React from 'react';
import Profile from '../component/Profile.js';
import renderer from 'react-test-renderer';

describe ('Profile component', () => {
    it ('renders correctly', () => {
        const tree = renderer.create(<Profile/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})

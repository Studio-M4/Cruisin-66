import React from 'react';
import CreateStop from '../component/CreateStop.js';
import renderer from 'react-test-renderer';

describe ('CreateStop component', () => {
    it ('renders correctly', () => {
        const props = {
            photos: [], 
            itineraryId: null, 
            address: null,
            description: null,
            name: null,
        }
        const tree = renderer.create(<CreateStop {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
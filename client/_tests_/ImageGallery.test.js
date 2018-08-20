import React from 'react';
import ImageGallery from '../component/ImageGallery.js';
import renderer from 'react-test-renderer';


describe('Image Gallery', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ImageGallery/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
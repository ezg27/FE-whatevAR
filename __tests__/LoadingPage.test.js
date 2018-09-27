import React from 'react';
import { shallow } from 'enzyme';
import { ImageBackground, Image } from 'react-native';
import renderer from 'react-test-renderer';
import LoadingPage from '../js/LoadingPage.js';

describe('LoadingPage', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<LoadingPage />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders ImageBackground', () => {
        const wrapper = shallow(<LoadingPage />);
        expect(wrapper.find(ImageBackground)).toHaveLength(1);
    });
    it('renders Images', () => {
        const wrapper = shallow(<LoadingPage />);
        expect(wrapper.find(Image)).toHaveLength(2);
    });
});
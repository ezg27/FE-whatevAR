import React from 'react';
import { shallow } from 'enzyme';
import { Text, TouchableHighlight } from 'react-native';
import renderer from 'react-test-renderer';
import Error from '../js/Error.js';

describe('Error', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Error />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('displays text', () => {
        const wrapper = shallow(<Error />);
        expect(wrapper.find(Text)).toHaveLength(3);
    });
    it('simulates click events', () => {
        const onButtonClick = jest.fn();
        const wrapper = shallow(<Error displayError={onButtonClick}/>);
        wrapper.find(TouchableHighlight).first().props().onPress();
        expect(onButtonClick.mock.calls.length).toBe(1);
    });
});
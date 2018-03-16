import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('multiplicacao', () => {
  const wrapper = shallow(<App />);
  wrapper.find('#valor').simulate('change', {
    target: { value: '5*9' }
  })
  const renderedResult = wrapper.find('#resultado').text()
  expect(renderedResult).toBe('45')
})

it('soma', () => {
  const wrapper = shallow(<App />);
  wrapper.find('#valor').simulate('change', {
    target: { value: '5+13' }
  })
  const renderedResult = wrapper.find('#resultado').text()
  expect(renderedResult).toBe('18')
})

it('erro', () => {
  const wrapper = shallow(<App />);
  wrapper.find('#valor').simulate('change', {
    target: { value: '5' }
  })
})

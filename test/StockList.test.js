import React from 'react';
import StockList from './../src/client/components/StockList';
import { shallow } from 'enzyme';

// describe ('<App />', () => {
//   it('renders 1 <App /> component', () => {
//     const component = shallow(<App />);
//     expect(component).toHaveLength(1);
//   });
// });

test('render a StockList component', () => {
    const wrapper = shallow(
        <StockList />
    );
    expect(wrapper).toMatchSnapshot();
});

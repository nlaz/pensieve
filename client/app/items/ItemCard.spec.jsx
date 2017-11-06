import expect from 'expect';
import React from 'react';
import ItemCard from './ItemCard';
import { shallow } from 'enzyme';

describe('ItemCard', () => {
  it('should render onto the DOM', () => {
    const item = { _id: 123, title: 'Example card' };
    const wrapper = shallow(<ItemCard item={item} />);
    expect(wrapper.exists()).toBe(true);
  });
});

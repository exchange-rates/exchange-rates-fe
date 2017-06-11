import React from 'react';
import { shallow } from 'enzyme';
import tape from 'tape';
import ResultBox from './ResultBox';

const component = shallow(<ResultBox rate={5} />);

tape('<ResultBox /> should render properly', (t) => {
  const comp = component.find('div');
  t.equal(comp.length, 1);
  t.end();
});

tape('<ResultBox /> should return date if date is set', (t) => {
  component.setProps({ date: '2017-05-11' });

  const text = component.find('p').at(0).text();
  t.equal(text, 'For 2017-05-11:');
  t.end();
});

tape('<ResultBox /> should return "currently" if date is not set', (t) => {
  component.setProps({ date: '' });

  const text = component.find('p').at(0).text();
  t.equal(text, 'Currently:');
  t.end();
});

tape('<ResultBox /> should not render if rate is undefined', (t) => {
  component.setProps({ rate: null });

  t.equal(component.find('div').length, 0);
  t.end();
});

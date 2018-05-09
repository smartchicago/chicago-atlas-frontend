import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';

function add(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    return 0;
  }
}

const dummyState = { a: 0 };

describe('Dummy', () => {
  beforeAll(() => {
    const fixture = '<div id="dom-test"></div>';
    if (window) {
      document.body.innerHTML = fixture;
    }

    // test immutability
    deepFreeze(dummyState);

  });

  it('does nothing', () => {
    expect(1).toEqual(1);
  });

  it('also does nothing', () => {
    expect(0).toBeFalsy;
  });

  it('adds numbers', () => {
    expect(add(2, 3)).toEqual(5);
  });

  it('handles wrong type', () => {
    expect(add('a', 3)).toEqual(0);
  });

  it('should have DOM', () => {
    expect(document.getElementById('dom-test')).toBeDefined;
  });

  it('should be skipped');
});

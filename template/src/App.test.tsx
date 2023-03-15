import { act, render } from '@testing-library/react';

import { App } from './App';

describe.skip('App', () => {
  it('should be wrapped by ChakraProvider with the correct theme', () => {
    let result;
    act(() => {
      result = render(<App />);
    });
    console.debug(result);
  });
});

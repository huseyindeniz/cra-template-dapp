import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

import { HomePage } from './Home';

describe('HomePage', () => {
  it('should render the component', () => {
    const { getByText } = render(
      <HelmetProvider>
        <HomePage />
      </HelmetProvider>
    );
    const title = getByText('dApp CRA Template');
    const description = getByText(
      'dApp CRA Template is a create-react-app template specifically designed for decentralized application (dApp) development.'
    );
    const learnReactButton = getByText('Learn React');
    const learnDappCraTemplateButton = getByText('Learn dApp CRA Template');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(learnReactButton).toBeInTheDocument();
    expect(learnDappCraTemplateButton).toBeInTheDocument();
  });
});

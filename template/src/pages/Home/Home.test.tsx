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
    const title = getByText('CRA Template: dApp');
    const description = getByText(
      'CRA Template: dApp is a create-react-app template specifically designed for decentralized application (dApp) frontend development.'
    );
    const learnReactButton = getByText('Learn React');
    const learnDappCraTemplateButton = getByText('Learn CRA Template: dApp');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(learnReactButton).toBeInTheDocument();
    expect(learnDappCraTemplateButton).toBeInTheDocument();
  });
});

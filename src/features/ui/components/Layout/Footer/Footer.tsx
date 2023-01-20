import React from 'react';

import { Copyright } from '../Copyright/Copyright';
import { SecondaryMenu } from '../SecondaryMenu/SecondaryMenu';
import { SiteLogo } from '../SiteLogo/SiteLogo';
import { SocialMenu } from '../SocialMenu/SocialMenu';

import { FooterView } from './FooterView/FooterView';

export interface FooterProps {
  siteName: string;
}

export const Footer: React.FC<FooterProps> = ({ siteName }) => {
  return (
    <FooterView
      firstRowContent={
        <>
          <SiteLogo siteName={siteName} />
          <SecondaryMenu />
        </>
      }
      secondRowContent={
        <>
          <Copyright />
          <SocialMenu />
        </>
      }
    />
  );
};

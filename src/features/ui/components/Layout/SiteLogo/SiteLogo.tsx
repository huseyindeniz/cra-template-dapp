import { Avatar, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { usePageLink } from '../../../../../pages/usePageLink';
import imageSiteLogo from '../../../assets/images/logo.webp';

export interface SiteLogoProps {
  siteName: string;
}
export const SiteLogo: React.FC<SiteLogoProps> = ({ siteName }) => {
  const homeLink = usePageLink('/');
  return (
    <Box>
      <Link to={homeLink}>
        <Avatar src={imageSiteLogo} name={siteName} />
      </Link>
    </Box>
  );
};

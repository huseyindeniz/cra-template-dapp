import { Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { usePages } from '../../../../../pages/usePages';

export const FooterMenu: React.FC = () => {
  const { footerMenuItems } = usePages();
  const activeMenuColor = useColorModeValue('blue.900', 'blue.100');
  return (
    <>
      {footerMenuItems &&
        footerMenuItems.map((link, index) => (
          <Link
            key={index}
            _activeLink={{
              color: activeMenuColor,
              fontWeight: 'bold',
            }}
            as={RouterLink}
            to={link.path ?? ''}
          >
            {link.menuLabel}
          </Link>
        ))}
    </>
  );
};

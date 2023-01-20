import { Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import { usePages } from '../../../../../pages/usePages';

export interface MainMenuProps {
  onClick: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onClick }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const activeMenuColor = useColorModeValue('blue.900', 'blue.100');
  const { mainMenuItems } = usePages();
  return (
    <>
      {mainMenuItems !== undefined && mainMenuItems.length > 0
        ? mainMenuItems.map((link, index) => (
            <Link
              key={index}
              as={RouterLink}
              to={link.path ?? ''}
              px={2}
              py={1}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: bgColor,
              }}
              _activeLink={{
                color: activeMenuColor,
                fontWeight: 'bold',
              }}
              onClick={onClick}
            >
              {link.menuLabel}
            </Link>
          ))
        : null}
    </>
  );
};

import { Box, Link, Button } from '@chakra-ui/react';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import React from 'react';

// You can remove or change this section
// however, I'd like to reach people as much as possible
// and I'd be appreceated if you don't remove it
// Hüseyin Deniz KIVRAK - https://github.com/huseyindeniz

export const Copyright: React.FC = React.memo(() => {
  const copyrightLabel: string = 'dApp CRA Template';
  const copyrightUrl: string =
    'https://github.com/huseyindeniz/cra-template-dapp';

  return (
    <Box color="gray">
      <Button
        as={Link}
        href={copyrightUrl}
        rel="noopener noreferrer"
        isExternal
        variant="ghost"
        size="xs"
        rightIcon={<FaExternalLinkAlt />}
      >
        {copyrightLabel}
      </Button>
    </Box>
  );
});

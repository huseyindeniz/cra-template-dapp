import { Box, Link, Button } from '@chakra-ui/react';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import React from 'react';

// You can remove or change this section

export const Copyright: React.FC = React.memo(() => {
  const copyrightLabel: string = 'powered by CRA Template: dApp v1.2.1';
  const copyrightUrl: string =
    'https://github.com/huseyindeniz/cra-template-dapp';

  return (
    <Box>
      <Button
        as={Link}
        href={copyrightUrl}
        rel="noopener noreferrer"
        isExternal
        variant="ghost"
        size="xs"
        rightIcon={<FaExternalLinkAlt />}
        color="gray"
        fontWeight="normal"
      >
        {copyrightLabel}
      </Button>
    </Box>
  );
});

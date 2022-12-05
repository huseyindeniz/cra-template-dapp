import React from "react";
import { Box, Link, Avatar, Button } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";

export interface CopyrightProps {
  copyrightLabel: string;
  copyrightUrl: string;
  copyrightLogoUrl: string;
}

export const Copyright: React.FC<CopyrightProps> = ({
  copyrightLabel,
  copyrightUrl,
  copyrightLogoUrl,
}) => {
  return (
    <Box color={"grey"}>
      <Avatar size={"xs"} src={copyrightLogoUrl} name={copyrightLabel} mr={2} />
      &copy;
      <Button
        as={Link}
        href={copyrightUrl}
        isExternal
        variant={"ghost"}
        size={"xs"}
        rightIcon={<FaExternalLinkAlt />}
      >
        {copyrightLabel}
      </Button>
    </Box>
  );
};

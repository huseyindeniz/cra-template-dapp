import React from "react";
import { Box, Link, Avatar, Button } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";

export const Copyright: React.FC = () => {
  const copyrightLabel: string = "dApp CRA Template";
  const copyrightUrl: string =
    "https://github.com/huseyindeniz/cra-template-dapp";
  const copyrightLogoUrl: string =
    "https://huseyindeniz.net/static/media/logo.cf1063933b90ff363f2d.jpg";

  return (
    <Box color={"grey"}>
      <Button
        as={Link}
        href={copyrightUrl}
        isExternal
        variant={"ghost"}
        size={"xs"}
        rightIcon={<FaExternalLinkAlt />}
        leftIcon={
          <Avatar size={"xs"} src={copyrightLogoUrl} name={copyrightLabel} />
        }
      >
        {copyrightLabel}
      </Button>
    </Box>
  );
};

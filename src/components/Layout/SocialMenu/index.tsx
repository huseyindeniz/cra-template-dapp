import React, { ReactNode } from "react";
import { chakra, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";

import { SocialLink, SocialLinkName } from "../../../config/types";

const FaGithub = React.lazy(() =>
  import("@react-icons/all-files/fa/FaGithub").then((module) => ({
    default: module.FaGithub,
  }))
);
const FaTwitter = React.lazy(() =>
  import("@react-icons/all-files/fa/FaTwitter").then((module) => ({
    default: module.FaTwitter,
  }))
);
const FaDiscord = React.lazy(() =>
  import("@react-icons/all-files/fa/FaDiscord").then((module) => ({
    default: module.FaDiscord,
  }))
);
const FaInstagram = React.lazy(() =>
  import("@react-icons/all-files/fa/FaInstagram").then((module) => ({
    default: module.FaInstagram,
  }))
);
const FaLinkedin = React.lazy(() =>
  import("@react-icons/all-files/fa/FaLinkedin").then((module) => ({
    default: module.FaLinkedin,
  }))
);
const FaYoutube = React.lazy(() =>
  import("@react-icons/all-files/fa/FaYoutube").then((module) => ({
    default: module.FaYoutube,
  }))
);
const FaTelegram = React.lazy(() =>
  import("@react-icons/all-files/fa/FaTelegram").then((module) => ({
    default: module.FaTelegram,
  }))
);

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target={"_blank"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Icon = ({ name }: { name: SocialLinkName }) => {
  switch (name) {
    case "GitHub":
      return <FaGithub />;
    case "Instagram":
      return <FaInstagram />;
    case "Linkedin":
      return <FaLinkedin />;
    case "Twitter":
      return <FaTwitter />;
    case "YouTube":
      return <FaYoutube />;
    case "Discord":
      return <FaDiscord />;
    case "Telegram":
      return <FaTelegram />;
  }
};

export interface SocialMenuProps {
  items: SocialLink[];
}

export const SocialMenu: React.FC<SocialMenuProps> = React.memo(({ items }) => {
  return (
    <>
      {items &&
        items.map((i) => (
          <SocialButton label={i.name} href={i.link} key={i.name}>
            <Icon name={i.name} />
          </SocialButton>
        ))}
    </>
  );
});

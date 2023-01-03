import React, { ReactNode } from "react";
import { chakra, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";

const FaGithub = React.lazy(() =>
  import("@react-icons/all-files/fa/FaGithub").then((module) => ({
    default: module.FaGithub,
  }))
);
const FaLinkedin = React.lazy(() =>
  import("@react-icons/all-files/fa/FaLinkedin").then((module) => ({
    default: module.FaLinkedin,
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
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      target="_blank"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const SocialMenu: React.FC = React.memo(() => {
  return (
    <>
      <SocialButton
        label="GitHub"
        href="https://github.com/huseyindeniz"
        key="GitHub"
      >
        <React.Suspense fallback="">
          <FaGithub />
        </React.Suspense>
      </SocialButton>
      <SocialButton
        label="Linkedin"
        href="https://linkedin.com/in/huseyindenizkivrak/en-us"
        key="Linkedin"
      >
        <React.Suspense fallback="">
          <FaLinkedin />
        </React.Suspense>
      </SocialButton>
    </>
  );
});

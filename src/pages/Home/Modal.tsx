import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";

export const Modal: React.FC = () => {
  const { t, i18n } = useTranslation("PageHome");
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={"blue"}
        bg={"blue.400"}
        rounded={"full"}
        px={6}
        _hover={{
          bg: "blue.500",
        }}
      >
        {t("Get Started")}
      </Button>
      <ChakraModal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        size={"xl"}
        preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {t("Get Started")}:
            <Divider mt={1} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3}>
            <ReactPlayer
              width={"100%"}
              url="https://www.youtube.com/watch?v=SWB2PnDzrUc"
              controls={true}
              light={"./assets/images/get-started.png"}
            />
            <Center m={2} p={2}>
              <Button
                as={RouterLink}
                to={"/" + i18n.language + "/documentation"}
                variant={"link"}
                colorScheme={"blue"}
                size={"sm"}
              >
                {t("See full documentation")}
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

import {
  Stack,
  RadioGroup,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
  Image,
} from "@chakra-ui/react";

import { SupportedLang } from "../../../config/types";

import imageTrFlag from "../../../assets/images/flags/tr.webp";
import imageUsFlag from "../../../assets/images/flags/us.webp";

const imagesFlag: Record<string, string> = {
  tr: imageTrFlag,
  us: imageUsFlag,
};

export interface LangModalProps {
  onClose: () => void;
  onChange: () => void;
  defaultValue: string;
  isOpen: boolean;
  supportedLanguages: SupportedLang[];
}

export const LangModal: React.FC<LangModalProps> = ({
  onClose,
  onChange,
  defaultValue,
  isOpen,
  supportedLanguages,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Language Selection
          <Divider mt={1} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={3}>
          <RadioGroup
            defaultValue={defaultValue}
            onChange={onChange}
            onClick={onClose}
          >
            <Stack>
              {supportedLanguages.map((l) => (
                <Radio key={l.code} value={l.code}>
                  <Image
                    src={imagesFlag[l.code.slice(-2).toLowerCase()]}
                    style={{
                      margin: "0.4em",
                      width: "1.6em",
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                  />
                  {l.label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

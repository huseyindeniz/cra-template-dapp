import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { i18nConfig } from "../../../config/i18n";
import { LangModal } from "./LangModal";

export const LangMenu: React.FC = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { i18n, ready } = useTranslation("Layout");

  const navigate = useNavigate();
  const { lang } = useParams();
  const location = useLocation();

  useEffect(() => {
    navigate(location.pathname.replace(lang || "", i18n.resolvedLanguage));
    // eslint-disable-next-line
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (
      i18nConfig.supportedLanguages.find((l) => l.code === lang) ===
        undefined &&
      location.pathname !== "/"
    ) {
      navigate("/" + i18n.resolvedLanguage + "/not-found");
    }
    // eslint-disable-next-line
  }, [lang, ready]);

  return (
    <>
      <Button onClick={onOpen} variant={"outline"}>
        {lang}
      </Button>

      <LangModal
        onClose={onClose}
        onChange={i18n.changeLanguage}
        defaultValue={i18n.resolvedLanguage}
        isOpen={isOpen}
        supportedLanguages={i18nConfig.supportedLanguages}
      />
    </>
  );
};

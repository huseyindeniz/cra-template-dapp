import { useTranslation } from "react-i18next";
import { Box } from "@chakra-ui/react";
import { AlertMessage } from "../../UI/AlertMessage";

export interface ErrorFallbackProps {
  error: Error;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const { t } = useTranslation("Layout");
  return (
    <Box m={10}>
      <AlertMessage status="error" title={t("An error occured!")}>
        {error.message}
      </AlertMessage>
    </Box>
  );
};
import { Text, Badge, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export interface ShortDateProps {
  date: Date;
  label: string | null;
}

export const ShortDate: React.FC<ShortDateProps> = ({ date, label }) => {
  const { i18n } = useTranslation("Components");
  return (
    <HStack>
      {label && (
        <Badge p={1} textTransform={"none"}>
          {label}:
        </Badge>
      )}
      <Text>
        {new Intl.DateTimeFormat(i18n.resolvedLanguage, {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date(date))}
      </Text>
    </HStack>
  );
};

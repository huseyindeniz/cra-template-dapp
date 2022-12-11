import { useTranslation } from "react-i18next";

export interface MonthYearProps {
  date: Date;
}

export const MonthYear: React.FC<MonthYearProps> = ({ date }) => {
  const { i18n } = useTranslation("Components");
  return (
    <>
      {new Intl.DateTimeFormat(i18n.language, {
        year: "numeric",
        month: "long",
      }).format(new Date(date))}
    </>
  );
};

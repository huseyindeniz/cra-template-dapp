import { useTranslation } from "react-i18next";

export interface DurationInYearsAndMonthProps {
  dateStart: Date;
  dateEnd: Date | null;
}

export const DurationInYearsAndMonth: React.FC<DurationInYearsAndMonthProps> =
  ({ dateStart, dateEnd }) => {
    const { t } = useTranslation("Components");
    let endDate = dateEnd ? dateEnd : new Date();
    let months;
    months = (endDate.getFullYear() - dateStart.getFullYear()) * 12;
    months -= dateStart.getMonth();
    months += endDate.getMonth();
    months = months <= 0 ? 0 : months + 1;
    const years = Math.floor(months / 12);
    const monthsLeft = months % 12;
    return (
      <>
        {years > 0 && t("{{count}} Years", { count: years })}{" "}
        {monthsLeft > 0 && t("{{count}} Months", { count: monthsLeft })}
      </>
    );
  };

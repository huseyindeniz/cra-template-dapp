import { useTranslation } from 'react-i18next';

import { i18nConfig } from '../features/i18n/config';

export const usePageLink = (originalPath: string) => {
  const { i18n } = useTranslation('Menu');
  const translatedPath =
    i18n.resolvedLanguage === i18nConfig.fallbackLang.code
      ? originalPath
      : `/${i18n.resolvedLanguage}${originalPath}`;

  return translatedPath;
};

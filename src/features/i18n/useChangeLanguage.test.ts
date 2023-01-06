import { cleanup } from '@testing-library/react';

import { i18nConfig } from './config';
import { useChangeLanguage } from './useChangeLanguage';

// Mock the navigate function
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Feature: i18n', () => {
  describe('useChangeLanguage', () => {
    afterEach(() => {
      cleanup();
    });

    it('/ => /tr-TR is ok', async () => {
      const currentUrl = '/';
      const currentLang = i18nConfig.fallbackLang.code;
      const targetLang = 'tr-TR';
      const { changeLanguage } = useChangeLanguage(currentUrl, currentLang);
      changeLanguage(targetLang);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/tr-TR/');
    });

    it('/anySubPageUrl => /tr-TR/anySubPageUrl is ok', async () => {
      const currentUrl = '/anySubPageUrl';
      const currentLang = i18nConfig.fallbackLang.code;
      const targetLang = 'tr-TR';
      const { changeLanguage } = useChangeLanguage(currentUrl, currentLang);
      changeLanguage(targetLang);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/tr-TR/anySubPageUrl');
    });

    it('/ja-JP => /tr-TR is ok', async () => {
      const currentUrl = '/ja-JP';
      const currentLang = 'ja-JP';
      const targetLang = 'tr-TR';
      const { changeLanguage } = useChangeLanguage(currentUrl, currentLang);
      changeLanguage(targetLang);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/tr-TR');
    });

    it('/ja-JP/anySubPageUrl => /tr-TR/anySubPageUrl is ok', async () => {
      const currentUrl = '/ja-JP/anySubPageUrl';
      const currentLang = 'ja-JP';
      const targetLang = 'tr-TR';
      const { changeLanguage } = useChangeLanguage(currentUrl, currentLang);
      changeLanguage(targetLang);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/tr-TR/anySubPageUrl');
    });

    it.skip('/tr-TR => / is ok', async () => {
      const currentUrl = '/tr-TR';
      const currentLang = 'tr-TR';
      const targetLang = i18nConfig.fallbackLang.code;
      const { changeLanguage } = useChangeLanguage(currentUrl, currentLang);
      changeLanguage(targetLang);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });

    it('/tr-TR/anySubPageUrl => /anySubPageUrl is ok', async () => {
      const currentUrl = '/tr-TR/anySubPageUrl';
      const currentLang = 'tr-TR';
      const targetLang = i18nConfig.fallbackLang.code;
      const { changeLanguage } = useChangeLanguage(currentUrl, currentLang);
      changeLanguage(targetLang);
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/anySubPageUrl');
    });
  });
});

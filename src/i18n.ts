import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import spanish from "resources/locales/es.json";
import english from "resources/locales/en.json";

const resources: Resource = {
  es: {
    translation: spanish,
  },
  en: {
    translation: english,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    resources,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: true,
    },
  });

export const { t: getText } = i18n;

export default i18n;

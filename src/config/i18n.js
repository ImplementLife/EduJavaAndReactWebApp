import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { debug_i18n } from '@/res/prop.jsx'

i18n
    .use(HttpApi) // для завантаження перекладів з файлів
    .use(LanguageDetector) // автоматичне визначення мови
    .use(initReactI18next) // інтеграція з React
    .init({
        fallbackLng: 'en', // мова за замовчуванням
        debug: { debug_i18n },
        interpolation: {
            escapeValue: false, // для React це не обов'язково
        },
        backend: {
            loadPath: '/locales/{{lng}}.json',
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'], // порядок визначення мови
            caches: ['cookie'], // кешування в cookie
        },
    });

export default i18n;

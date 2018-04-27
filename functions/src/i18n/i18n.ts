import I18nCreator from 'i18n-js';

import en from './locales/en';
import pt from './locales/pt-BR';

I18nCreator.defaultLocale = 'en';
I18nCreator.fallbacks = true;

I18nCreator.translations = {
  en: {...I18nCreator.translations.en, notification: en},
  'pt-BR': {...I18nCreator.translations['pt-BR'], notification: pt},
};

export const I18n = I18nCreator;

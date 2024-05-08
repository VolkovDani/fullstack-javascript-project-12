import i18next from 'i18next';
import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ErrorBoundary, Provider as RollBarProvider } from '@rollbar/react';

import App from './components/App';
import resources from './locales/index.js';
import './locales/profanityList.js';

const init = async () => {
  const i18n = i18next.createInstance();

  const rollbarConfig = {
    accessToken: process.env.ROLLBACK_API_KEY,
    environment: process.env.ROLLBACK_API_ENV_NAME,
  };

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <RollBarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </RollBarProvider>
  );
};

export default init;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import registerServiceWorker from './registerServiceWorker';

import { pdfjs } from 'react-pdf';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import translations_cz from './translations/cz/translations.json';
import translations_en from './translations/en/translations.json';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'cz', // language to use
  resources: {
    en: {
      translations: translations_en, // 'translation' is our custom namespace, we're setting it in App.js
    },
    cz: {
      translations: translations_cz,
    },
  },
});

const rootElement = document.getElementById('root');
ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  rootElement
);

// registerServiceWorker();

import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookie from 'js-cookie';

const langFromCookie = Cookie.get(I18N_COOKIE_KEY);
if (!langFromCookie) {
  Cookie.set(I18N_COOKIE_KEY, 'zh-cn', { expires: 365 });
}

const localeResources = require.context('./common/locales', false, /\.json$/, 'sync');
const locales: { [lang: string]: { translation: { [key: string]: string }}} = {};

localeResources.keys().forEach(key => {
  locales[key.split(/([a-zA-Z-]+)\.json$/)[1].toLowerCase()] = {
    translation: localeResources(key)
  };
});

export async function initI18nextInstance () {
  return new Promise(resolve => {
    I18n.use(initReactI18next).init({
      react: {
        useSuspense: false,
      },
      keySeparator: false,
      resources: locales,
      lng: langFromCookie?.toLowerCase() || 'zh-cn'
    }, resolve);
  });
}

export default I18n;

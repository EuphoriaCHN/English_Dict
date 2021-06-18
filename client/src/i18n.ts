import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookie from 'js-cookie';

const DEFAULT_LANG = 'zh-CN';

let langFromCookie = (Cookie.get(I18N_COOKIE_KEY) || '');
if (!langFromCookie) {
  langFromCookie = DEFAULT_LANG;
  Cookie.set(I18N_COOKIE_KEY, langFromCookie, { expires: 365 });
}

const localeResources = require.context('./common/locales', false, /\.json$/, 'sync');
const locales: { [lang: string]: { translation: { [key: string]: string }}} = {};

localeResources.keys().forEach(key => {
  locales[key.split(/([a-zA-Z-]+)\.json$/)[1]] = {
    translation: localeResources(key)
  };
});

if (!Object.keys(locales).includes(langFromCookie)) {
  langFromCookie = DEFAULT_LANG;
}

export async function initI18nextInstance () {
  return I18n.use(initReactI18next).init({
    react: {
      useSuspense: false,
    },
    keySeparator: false,
    resources: locales,
    lng: langFromCookie,
    interpolation: {
      prefix: '{',
      suffix: '}'
    }
  });
}

export default I18n;

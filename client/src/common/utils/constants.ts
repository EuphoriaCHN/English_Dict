export enum STATUS_CODE {
  SUCCESS = 1000,
  COMMON_ERROR = 1001,
  NOT_FOUND = 1002,
  NOT_LOGIN = 1003,
  PERMISSION_DENIED = 1004
};

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  ERROR: 500,
};

export const LANGS = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'ko-KR': '한국어'
};

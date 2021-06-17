declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

declare var I18N_COOKIE_KEY: 'locale';
declare var AUTHORIZATION_KEY: 'Authorization';
declare var DEV_IP: 'http://127.0.0.1:7001';

declare interface EN2ZHTranslationResult {
  returnPhrase: string[]
  query: string;
  /**
   * 主要翻译结果语音 URL
   */
  tSpaceUrl: string;
  /**
   * 同义联想
   */
  web: {
    value: string[];
    key: string;
  }[];
  /**
   * 翻译结果
   */
  translation: string[];
  /**
   * 单词属性
   */
  basic: {
    /**
     * 考试单词 ['CET4', '高考', ...]
     */
    exam_type: string[];
    /**
     * 美式音标
     */
    'us-phonetic': string;
    /**
     * 音标（美）
     */
    phonetic: string;
    /**
     * 英式音标
     */
    'uk-phonetic': string;
    /**
     * 扩展，如 复数、现在分词、过去式 等
     */
    wfs: { wf: { name: string; value: string; } }[];
    /**
     * 源文案英式发音 URL
     */
    'uk-speech': string;
    /**
     * 源文案美式发音 URL
     */
    'us-speech': string;
    /**
     * 词义
     */
    explains: string[];
  },
  isWord: boolean;
  /**
   * 源文案发音 URL
   */
  speakUrl: string;
}
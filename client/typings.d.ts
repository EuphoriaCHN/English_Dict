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
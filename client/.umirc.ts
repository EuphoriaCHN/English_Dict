import { defineConfig } from 'umi';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      component: '@/layouts/index',
      path: '*',
      routes: [
        { path: '/Login', component: '@/containers/Login' },
        { path: '/wordBase', component: '@/containers/WordBase' },
        { path: '/translate', component: '@/containers/Translate' },
        { path: '/', component: '@/containers/Translate', exact: true },
        { component: '@/containers/NotFound' }
      ]
    },
  ],
  chainWebpack(chain) {
    chain.plugin('moment-js-webpack-plugin').use(new MomentLocalesPlugin({
      localesToKeep: ['en', 'zh-cn']
    }));
  },
  fastRefresh: {},
  history: {
    type: 'browser'
  },
  // ignoreMomentLocale: true,
  polyfill: {
    imports: ['core-js/stable']
  },
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  define: {
    I18N_COOKIE_KEY: 'locale',
    AUTHORIZATION_KEY: 'Authorization',
    DEV_IP: 'http://127.0.0.1:7001'
  }
});

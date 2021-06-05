import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      component: '@/layouts/index',
      path: '*',
      routes: [
        // { path: '/', component: '@/containers/Platform', exact: true },
        // { path: '*', component: '@/containers/NotFound' }
      ]
    },
  ],
  fastRefresh: {},
  history: {
    type: 'browser'
  },
  ignoreMomentLocale: true,
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
  }
});

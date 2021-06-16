import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  redis: {
    package: 'egg-redis',
    enable: true
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  }
};

export default plugin;

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
};

export default plugin;

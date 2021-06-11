import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as CONFIG from './constants';

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    redis: {
      client: CONFIG.REDIS_CONFIG,
    },
    logger: {
      outputJSON: true
    },
    security: {
      csrf: {
        enable: false
      }
    }
  };

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + CONFIG.COOKIE_SALT;

  // add your egg config in here
  config.middleware = ['normalCatch', 'notFoundHandler'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx, app } = this;
    const REDIS_KEY = 'ping';

    const existsCache = await app.redis.exists(REDIS_KEY);

    if (!existsCache) {
      await app.redis.set(REDIS_KEY, 'pong');
      return (ctx.body = 'Set Cache');
    }

    const cacheValue = await app.redis.get(REDIS_KEY);
    await app.redis.del(REDIS_KEY);
    return ctx.body = cacheValue;
  }
}

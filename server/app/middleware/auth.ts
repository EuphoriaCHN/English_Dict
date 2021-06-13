import { Context } from 'egg';
import * as assert from 'assert';

export default async function (ctx: Context, next: () => Promise<any>) {
    const jwtToken = ctx.helper.getAuthorizationValue(ctx);

    try {
        // token 错误
        assert(!!jwtToken || typeof jwtToken !== 'string');
        const tokenData = ctx.helper.verifyJWT(jwtToken as string);

        // 缓存对比
        const redisKey = ctx.helper.getLoginRedisKey(tokenData.userID);
        const tokenInCache: any = await ctx.app.redis.get(redisKey);
        assert(tokenInCache === jwtToken);

        // 刷新缓存
        await ctx.app.redis.set(redisKey, tokenInCache, 'EX', global.REDIS_EXPIRE_TIME);
        ctx.jwtUserLoginData = tokenData;
    } catch (err) {
        throw new global.ServerError('NOT_LOGIN', ctx.t('用户未登录'));
    }

    const resData = await next();
    ctx.jwtUserLoginData = null;
    
    return resData;
}
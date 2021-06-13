import { Context } from 'egg';
import * as assert from 'assert';

export default async function (ctx: Context, next: () => Promise<any>) {
    const jwtToken = ctx.helper.getAuthorizationValue(ctx);

    try {
        // token 错误
        assert(!!jwtToken || typeof jwtToken !== 'string');
        const tokenData = ctx.helper.verifyJWT(jwtToken as string);

        // 缓存对比
        const tokenInCache = await ctx.app.redis.get(ctx.helper.getLoginRedisKey(tokenData.userID));
        assert(tokenInCache === jwtToken);

        ctx.jwtUserLoginData = tokenData;
    } catch (err) {
        throw new global.ServerError('NOT_LOGIN', ctx.t('用户未登录'));
    }

    const resData = await next();
    ctx.jwtUserLoginData = null;
    
    return resData;
}
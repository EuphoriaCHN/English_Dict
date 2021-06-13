import { Controller } from 'egg';
import * as assert from 'assert';

export default class UserController extends Controller {
    /**
     * 账号登录
     */
    public async accountLogin() {
        const { ctx } = this;
        ctx.status = 200;

        const jwtToken = ctx.helper.getAuthorizationValue(ctx);
        if (typeof jwtToken === 'string' && !!jwtToken.length) {
            try {
                // 解析 JWT
                const jwtData = ctx.helper.verifyJWT(jwtToken);
                assert(!!jwtData['userID']);

                // 对比缓存
                const tokenInRedis = await this.app.redis.get(ctx.helper.getLoginRedisKey(jwtData.userID));
                assert(tokenInRedis === jwtToken);

                // 缓存生效，更新缓存
                await this.app.redis.set(ctx.helper.getLoginRedisKey(jwtData.userID || -1), jwtToken, 'EX', global.REDIS_EXPIRE_TIME);
                return {
                    token: jwtToken,
                    message: ctx.t('已登录')
                };
            } catch (err) {

            }
        }

        const { account, password } = ctx.request.body;

        assert(typeof account === 'string' && !!account.length, ctx.t('{0} 参数对 {1} 来说是必须的', ['account', 'accountLogin']));
        assert(typeof password === 'string' && !!account.length, ctx.t('{0} 参数对 {1} 来说是必须的', ['password', 'accountLogin']));

        const userData = await ctx.service.user.queryOneUser({ account });

        assert(!!userData, ctx.t('账户不存在'));

        const inputPasswordHashed = ctx.helper.sha256(password);
        assert(userData?.password === inputPasswordHashed, ctx.t('密码错误'));

        // sign JWT
        const token = ctx.helper.signJWT({
            userID: userData?.id,
            nickName: userData?.nickName,
            account: userData?.account,
        });
        // Save JWT in cache
        await this.app.redis.set(ctx.helper.getLoginRedisKey(userData?.id || -1), token, 'EX', global.REDIS_EXPIRE_TIME);

        return {
            token,
            message: ctx.t('登录成功')
        };
    }
}
import { Controller } from 'egg';
import * as assert from 'assert';

export default class UserController extends Controller {
    /**
     * 账号登录
     */
    public async accountLogin() {
        const { ctx } = this;
        ctx.status = 200;

        const { account, password } = ctx.request.body;

        assert(typeof account === 'string' && !!account.length, ctx.t('{0} 参数对 {1} 来说是必须的', ['account', 'accountLogin']));
        assert(typeof password === 'string' && !!account.length, ctx.t('{0} 参数对 {1} 来说是必须的', ['password', 'accountLogin']));

        const userData = await ctx.service.user.queryOneUser({ account });

        assert(!!userData, ctx.t('账户不存在'));

        const inputPasswordHashed = ctx.helper.sha256(password);
        assert(userData?.password === inputPasswordHashed, ctx.t('密码错误'));

        return true;
    }
}
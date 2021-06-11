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

        assert(typeof account === 'string' && !!account.length, 'Account is required parameter for accountLogin');
        assert(typeof password === 'string' && !!account.length, 'Password is required parameter for accountLogin');

        const userData = await ctx.service.user.queryOneUser({ account });

        assert(!!userData, '账户不存在');

        const inputPasswordHashed = ctx.helper.sha256(password);
        assert(userData?.password === inputPasswordHashed, '密码错误');

        return true;
    }
}
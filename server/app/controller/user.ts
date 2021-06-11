import { Controller } from 'egg';

export default class UserController extends Controller {
    /**
     * 账号登录
     */
    public async accountLogin() {
        const { ctx } = this;

        const { account } = ctx.body;

        const dbData = await ctx.service.user.queryOneUser({ account });

        ctx.logger.debug(dbData);

        return dbData;
    }
}
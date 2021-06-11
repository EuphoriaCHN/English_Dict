import { Controller } from 'egg';

export default class UserController extends Controller {
    /**
     * 账号登录
     */
    public async accountLogin() {
        const { ctx } = this;

        throw new global.ServerError('COMMON_ERROR', 'fuck');

        // ctx.body = '1';
    }
}
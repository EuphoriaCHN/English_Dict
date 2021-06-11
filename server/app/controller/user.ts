import { Controller } from 'egg';

export default class UserController extends Controller {
    /**
     * 账号登录
     */
    public async accountLogin() {
        const { ctx } = this;

        ctx.body = '1';
    }
}
import { Controller } from 'egg';

import * as assert from 'assert';

export default class WordBaseController extends Controller {
    /**
     * 获取某个用户的词库列表
     */
    public async getWordBaseByUserID() {
        const ctx = this.ctx;
        ctx.status = 200;

        const { userID } = ctx.jwtUserLoginData || {};

        assert(!isNaN(parseInt(userID)), ctx.t('{0} 参数对 {1} 来说是必须的', ['userID', 'getWordBaseByUserID']));

        return ctx.service.wordBase.getWordBaseByUserID(userID);
    }
}
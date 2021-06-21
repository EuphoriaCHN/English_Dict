import { Controller } from 'egg';
import { isNumber } from 'util';

import * as assert from 'assert';

export default class WordBaseWordsController extends Controller {
    /**
     * 获取某个用户词库中的词（分页）
     */
    public async getWordBaseWords() {
        const ctx = this.ctx;
        ctx.status = 200;

        const { wordBaseID, limit, offset } = ctx.request.query;
        const { userID } = ctx.jwtUserLoginData || {};

        assert(!isNumber(wordBaseID), ctx.t('{0} 参数对 {1} 来说是必须的', ['wordBaseID', 'getWordBaseWords']));
        assert(!isNumber(limit), ctx.t('{0} 参数格式错误', ['limit']))
        assert(!isNumber(offset), ctx.t('{0} 参数格式错误', ['offset']))
        assert(!!userID, ctx.t('{0} 参数对 {1} 来说是必须的', ['jwt.user', 'getWordBaseWords']));

        const wordBaseInDB = await ctx.service.wordBase.querySingleWordBase({ id: wordBaseID });
        assert(!!wordBaseInDB, ctx.t('不存在 ID 为 {0} 的词库', [wordBaseID]));
        assert(wordBaseInDB?.ownerId == userID, ctx.t('词库权限错误'));

        return await ctx.service.wordBaseWords.getWordBaseWords(Number(wordBaseID), Number(limit), Number(offset));
    }
}

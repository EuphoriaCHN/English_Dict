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

    /**
     * 添加文案到词库
     */
    public async createWordBaseWord() {
        const ctx = this.ctx;
        ctx.status = 200;

        const { wordBaseID } = ctx.request.body;
        const trans: EN2ZHTranslationResult = ctx.request.body.trans;

        assert(typeof wordBaseID === 'number' && wordBaseID > 0, ctx.t('{0} 参数对 {1} 来说是必须的', ['wordBaseID', 'pushWordIntoWordBase']));
        assert(typeof trans === 'object' && !!trans, ctx.t('{0} 参数对 {1} 来说是必须的', ['trans', 'pushWordIntoWordBase']));

        const wordContent = trans.query;
        assert(typeof wordContent === 'string' && !!wordContent.length, ctx.t('错误的 trans 参数格式，缺少 query',));

        await ctx.service.wordBaseWords.createWordBaseWord(wordBaseID, wordContent, trans);
    }
}
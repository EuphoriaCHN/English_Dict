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

        assert(typeof wordBaseID === 'number' && wordBaseID > 0, ctx.t('{0} 参数对 {1} 来说是必须的', ['wordBaseID', 'createWordBaseWord']));
        assert(typeof trans === 'object' && !!trans, ctx.t('{0} 参数对 {1} 来说是必须的', ['trans', 'createWordBaseWord']));

        const wordContent = trans.query;
        assert(typeof wordContent === 'string' && !!wordContent.length, ctx.t('错误的 trans 参数格式，缺少 query'));

        const data = await ctx.service.wordBaseWords.createWordBaseWord(wordBaseID, wordContent, trans);

        return {
            content: data.content,
            wordCreateTime: new Date().toTimeString(),
            examCount: data.examCount,
            passCount: data.passCount,
            wordBaseWordID: data.id,
            id: wordBaseID,
            name: (await ctx.service.wordBase.querySingleWordBase({ id: wordBaseID }))?.name
        };
    }

    /**
     * 从词库中移除某个文案
     */
    public async deleteWordBaseWord() {
        const ctx = this.ctx;
        ctx.status = 200;

        const { wordBaseID: wordBaseIDFromQuery, content, ID: idFromQuery } = ctx.request.query;
        const wordBaseID = Number(wordBaseIDFromQuery);
        const ID = Number(idFromQuery);

        assert(typeof wordBaseID === 'number' && wordBaseID > 0, ctx.t('{0} 参数对 {1} 来说是必须的', ['wordBaseID', 'deleteWordBaseWord']));
        assert(typeof ID === 'number' && ID > 0, ctx.t('{0} 参数对 {1} 来说是必须的', ['ID', 'deleteWordBaseWord']));
        assert(typeof content === 'string' && !!content.length, ctx.t('{0} 参数对 {1} 来说是必须的', ['content', 'deleteWordBaseWord']));

        await ctx.service.wordBaseWords.deleteWordBaseWord(wordBaseID, content, ID);
        return 'SUCCESS';
    }
}
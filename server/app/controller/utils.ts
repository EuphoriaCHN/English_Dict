import { Controller } from 'egg';
import fetch from 'node-fetch';

import { URLSearchParams } from 'url';
import * as assert from 'assert';

export default class UtilsController extends Controller {
    /**
     * 通用翻译
     */
    public async universalTranslate() {
        const ctx = this.ctx;
        ctx.status = 200;

        const { input: inputFromRequest } = ctx.request.query;
        const input = inputFromRequest.trim();
        
        assert(typeof input === 'string' && !!input.length, ctx.t('{0} 参数对 {1} 来说是必须的', ['input', 'universalTranslate']));
        assert(input.split(/ /).length === 1, ctx.t('只支持翻译单个单词'));

        const salt = Date.now();
        const curtime = Math.floor(salt / 1000);
        const inputToken = input.length > 20 ? `${input.slice(0, 10)}${input.length}${input.slice(input.length - 10)}` : input;

        const sign = ctx.helper.sha256(`${global.YOUDAO_TRANSLATE.APP_KEY}${inputToken}${salt}${curtime}${global.YOUDAO_TRANSLATE.SECRET_KEY}`);

        return await fetch('https://openapi.youdao.com/api', {
            method: 'POST',
            body: new URLSearchParams({
                q: input,
                // todo:: 更多的语种翻译？
                from: 'en',
                to: 'zh-CHS',
                appKey: global.YOUDAO_TRANSLATE.APP_KEY,
                salt: salt.toString(),
                sign,
                signType: 'v3',
                curtime: curtime.toString(),
                ext: 'mp3',
                voice: '0',
                strict: 'true',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }).then(val => val.json(), err => {
            ctx.logger.error(`有道翻译 API：${err.message}`);
            return null;
        }).then(data => {
            if (!data || data.errorCode !== '0') {
                throw new global.ServerError('COMMON_ERROR', ctx.t('翻译服务不可用'));
            }
            return data;
        });
    }
}

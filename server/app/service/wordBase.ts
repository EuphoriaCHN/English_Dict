import { Service } from 'egg';

export default class WordBaseService extends Service {
    /**
     * 获取某个用户的词库列表
     */
     public async getWordBaseByUserID(userID: number | string) {
        const ctx = this.ctx;

        return ctx.model.EnglishDictWordBase.findAll({
            where: {
                ownerId: userID
            },
            attributes: {
                exclude: ['ownerId']
            }
        });
    }
}
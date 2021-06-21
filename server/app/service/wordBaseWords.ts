import { Service } from 'egg';

export default class WordBaseWordsService extends Service {
    /**
     * 创建一个词库词
     */
    public async createWordBaseWord(wordBaseID: number, content: string, trans: EN2ZHTranslationResult) {
        return this.ctx.model.EnglishDictWordBaseWords.create({
            ownerBaseId: wordBaseID,
            content,
            translationResult: JSON.stringify(trans)
        });
    }

    /**
     * 删除一个词库词
     */
    public async deleteWordBaseWord(wordBaseID: number, content: string, ID: number) {
        return this.ctx.model.EnglishDictWordBaseWords.destroy({
            where: {
                ownerBaseId: wordBaseID,
                content,
                id: ID
            }
        });
    }

    /**
     * 获取某个用户词库中的词（分页）
     */
    public async getWordBaseWords(wordBaseID: number, limit: number = 10, offset: number = 0) {
        return this.ctx.model.EnglishDictWordBaseWords.findAndCountAll({
            where: { ownerBaseId: wordBaseID },
            limit,
            offset
        });
    }
}
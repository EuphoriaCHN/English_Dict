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
}
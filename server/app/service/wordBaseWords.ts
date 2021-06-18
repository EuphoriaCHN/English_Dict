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
}
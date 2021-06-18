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

    /**
     * 查询某个用户的所有库中是否存在某个单词
     * @todo 这个 service 目前没有 controller
     */
    public async getWordExistWordBases(userID: number | string, content: string, sourceLang?: string, targetLang?: string) {
        return this.ctx.sequelize.query(`SELECT 
            b.name, b.id 
        from
            english_dict_word_base_words as a, 
            english_dict_word_base as b 
        WHERE
            a.content = "${content}"
            AND b.id = a.owner_base_id
            AND b.source_lang = "${sourceLang}"
            AND b.target_lang = "${targetLang}"
            AND owner_base_id IN (
                SELECT
                    id
                FROM
                    english_dict_word_base
                WHERE
                    owner_id = ${userID}
            )`, { type:  this.app.Sequelize.QueryTypes.SELECT });
    }
}
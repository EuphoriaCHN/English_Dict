import { Service } from 'egg';

export default class UserService extends Service {
    /**
     * 查询用户
     * @param queryData.account 账号 
     */
    public async queryOneUser(queryData: { account: string }) {
        return this.ctx.model.EnglishDictUsers.findOne({
            where: queryData
        });
    }
}

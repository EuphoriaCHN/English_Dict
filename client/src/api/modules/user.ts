import { API } from '../config';

class UserAPI extends API {
    static PREFIX = '/user';

    accountLogin = UserAPI.sign({
        method: 'POST',
        url: '/accountLogin'
    });
}

export default new UserAPI();

import { API } from '../config';

class UserAPI extends API {
    static PREFIX = '/user';

    accountLogin = UserAPI.sign({
        method: 'POST',
        url: '/accountLogin'
    });

    verificationUserLoginJWT = UserAPI.sign({
        method: 'GET',
        url: '/verificationUserLoginJWT'
    });
}

export default new UserAPI();

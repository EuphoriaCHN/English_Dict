import { API } from '../config';

class UtilsAPI extends API {
    static PREFIX = '/utils';

    universalTranslate = UtilsAPI.sign({
        method: 'GET',
        url: '/universalTranslate'
    });
}

export default new UtilsAPI();

import { API } from '../config';

class UtilsAPI extends API {
    static PREFIX = '/utils';

    universalTranslate = UtilsAPI.sign<any, EN2ZHTranslationResult>({
        method: 'GET',
        url: '/universalTranslate'
    });
}

export default new UtilsAPI();

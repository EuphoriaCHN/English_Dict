import { API } from '../config';

class WordBaseAPI extends API {
    static PREFIX = '/wb';

    getWordBaseByUserID = WordBaseAPI.sign({
        method: 'GET',
        url: '/getWordBaseByUserID'
    });

    createWordBaseWord = WordBaseAPI.sign({
        method: 'POST',
        url: '/createWordBaseWord'
    });
}

export default new WordBaseAPI();

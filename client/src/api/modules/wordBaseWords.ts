import { API } from '../config';

class WordBaseWordsAPI extends API {
    static PREFIX = '/wbw';

    getWordBaseWords = WordBaseWordsAPI.sign({
        method: 'GET',
        url: '/getWordBaseWords'
    });
}

export default new WordBaseWordsAPI();

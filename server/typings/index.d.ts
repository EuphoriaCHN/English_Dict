import 'egg';
import { EggPluginItem, PlainObject } from 'egg';
import * as sequelize from 'sequelize';

import { STATUS_CODE, ServerError, YOUDAO_TRANSLATE } from '../config/constants';

declare module 'egg' {
    export interface IModel extends sequelize.Sequelize, PlainObject { }

    export interface EggPlugin {
        redis?: EggPluginItem;
    }

    export interface Application {
        Sequelize: typeof sequelize;
        model: IModel;
    }

    export interface Context {
        model: IModel;
        t: (key: string, opts?: any) => string;
        jwtUserLoginData?: any;
    }
}

declare global {
    module NodeJS {
        export interface Global {
            STATUS_CODE: typeof STATUS_CODE;
            ServerError: typeof ServerError;
            JWT_SECRET: string;
            REDIS_EXPIRE_TIME: number;
            AUTH_HTTP_HEADER_KEY: string;
            YOUDAO_TRANSLATE: typeof YOUDAO_TRANSLATE;
        }
    }

    export interface EN2ZHTranslationResult {
        returnPhrase: string[]
        query: string;
        /**
         * 主要翻译结果语音 URL
         */
        tSpeakUrl: string;
        /**
         * 同义联想
         */
        web: {
            value: string[];
            key: string;
        }[];
        /**
         * 翻译结果
         */
        translation: string[];
        /**
         * 单词属性
         */
        basic: {
            /**
             * 考试单词 ['CET4', '高考', ...]
             */
            exam_type: string[];
            /**
             * 美式音标
             */
            'us-phonetic': string;
            /**
             * 音标（美）
             */
            phonetic: string;
            /**
             * 英式音标
             */
            'uk-phonetic': string;
            /**
             * 扩展，如 复数、现在分词、过去式 等
             */
            wfs: { wf: { name: string; value: string; } }[];
            /**
             * 源文案英式发音 URL
             */
            'uk-speech': string;
            /**
             * 源文案美式发音 URL
             */
            'us-speech': string;
            /**
             * 词义
             */
            explains: string[];
        },
        isWord: boolean;
        /**
         * 源文案发音 URL
         */
        speakUrl: string;
    }
}
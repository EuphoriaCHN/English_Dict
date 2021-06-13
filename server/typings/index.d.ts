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
}
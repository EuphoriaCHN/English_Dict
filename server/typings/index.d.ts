import 'egg';
import { EggPluginItem, PlainObject } from 'egg';
import * as sequelize from 'sequelize';

import { STATUS_CODE, ServerError } from '../config/constants';

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
    }
}

declare global {
    module NodeJS {
        export interface Global {
            STATUS_CODE: typeof STATUS_CODE;
            ServerError: typeof ServerError;
        }
    }
}
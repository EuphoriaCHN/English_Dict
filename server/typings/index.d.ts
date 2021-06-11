import 'egg';
import { EggPluginItem, PlainObject } from 'egg';
import * as sequelize from 'sequelize';

declare module 'egg' {
    export interface IModel extends sequelize.Sequelize, PlainObject {}

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
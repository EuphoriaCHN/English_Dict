import { Application, IBoot } from 'egg';

import { SEQUELIZE_CONFIG, setGlobalData } from './config/constants';
import { initModels } from './app/model/init-models';
import * as sequelize from 'sequelize';

export default class Boot implements IBoot {
    constructor(private readonly _app: Application) {}

    configWillLoad() {
        setGlobalData();
    }

    configDidLoad() {}

    async willReady() {
        // inject sequelize orm to app instance
        const sequelizeInstance = new sequelize.Sequelize(Object.assign({ logging: false }, SEQUELIZE_CONFIG));
        await sequelizeInstance.authenticate();

        initModels(sequelizeInstance);
        this._app.Sequelize = sequelize;
        this._app.sequelize = sequelizeInstance;
        this._app.model = sequelizeInstance.models as any;

        this._app.context.model = sequelizeInstance.models;
        this._app.context.t = this._app.context.__;
        this._app.context.sequelize = sequelizeInstance;
    }
}
const SequelizeAuto = require('sequelize-auto');
const { development: dbConfig } = require('../config/database.config.json');

const prettier = require('prettier');

const path = require('path');
const fs = require('fs');

const MODEL_PATH = path.resolve(__dirname, '..', 'app/model');
const INIT_MODEL_REGEXP = /init-models\.[tj]s/;

(async function () {
    await new SequelizeAuto(dbConfig.database, dbConfig.username, dbConfig.password, {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'mysql',
        directory: MODEL_PATH,
        additional: {
            timestamps: false,
        },
        lang: 'ts',
        caseModel: 'p',
        caseFile: 'c',
        caseProp: 'c',
    }).run();

    fs.readdirSync(MODEL_PATH).forEach(fileName => {
        if (INIT_MODEL_REGEXP.test(fileName)) {
            return;
        }

        const filePath = path.resolve(MODEL_PATH, fileName);
        const fileData = fs.readFileSync(filePath, { encoding: 'utf8' });

        const modelClassName = fileData.split(/export class ([a-zA-Z]+) extends Model</)[1];
        const newFileData = prettier.format(`${fileData}\nexport default ${modelClassName};`, {
            semi: true,
            useTabs: false,
            tabWidth: 2,
            parser: 'typescript',
            singleQuote: true,
        });

        fs.writeFileSync(filePath, newFileData, { encoding: 'utf8' });
    });
})();


const scanner = require('i18next-scanner');
const gulp = require('gulp');
const sort = require('gulp-sort');
const translate = require('google-translate-open-api').default;

const fs = require('fs');
const path = require('path');

const LANGS = ['zh-CN', 'en-US'];
const DEFAULT_LANG = 'zh-CN';

const CLIENT_SRC = path.resolve(__dirname, '../..', 'client/src');
const SERVER_SRC = path.resolve(__dirname, '../..', 'server/app');

const CLIENT_I18N_DIR = '';
const SERVER_I18N_DIR = path.resolve(SERVER_SRC, 'i18n');

(async function () {
    const taskQueue = [
        // [CLIENT_SRC, CLIENT_I18N_DIR, require('./client-i18n-func')],
        [SERVER_SRC, SERVER_I18N_DIR, require('./server-i18n-func')]
    ];

    for (const [src, i18nDir, func] of taskQueue) {
        if (!fs.existsSync(i18nDir)) {
            fs.mkdirSync(i18nDir);
        }

        // Scan & Parse
        const stream = gulp.src([`${src}/**/*.ts`])
            .pipe(sort())
            .pipe(scanner({
                debug: false,
                func,
                trans: false,
                lngs: LANGS,
                defaultLng: DEFAULT_LANG,
                resource: {
                    jsonIndent: 2,
                    lineEnding: '\n',
                    loadPath: `{lng}.json`,
                    savePath: `{lng}.json`,
                },
                removeUnusedKeys: true,
                nsSeparator: true,
                keySeparator: true,
                interpolation: {
                    prefix: '{',
                    suffix: '}',
                },
            }))
            .pipe(gulp.dest(i18nDir));
        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        });

        // Handle Language
        const i18nFileNames = fs.readdirSync(i18nDir);
        for (const fileName of i18nFileNames) {
            const filePath = path.resolve(i18nDir, fileName);
            if (fs.statSync(filePath).isDirectory()) {
                return;
            }

            const lang = fileName.split(/^([a-zA-Z\-]+)\.json$/)[1];
            const fileData = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));

            // 项目源语言
            if (lang === DEFAULT_LANG) {
                // 翻译文案 = 源文案
                for (let key in fileData) {
                    fileData[key] = key;
                }
                fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), { encoding: 'utf8' });
                return;
            }

            // Translate
            const translationKeys = Object.keys(fileData);
            const { data } = await translate(translationKeys, {
                tld: 'cn',
                to: lang.startsWith('zh') ? lang.toLowerCase() : lang.split('-')[0].toLowerCase(),
                from: DEFAULT_LANG.startsWith('zh') ? DEFAULT_LANG.toLowerCase() : DEFAULT_LANG.split('-')[0].toLowerCase(),
                client: 'dict-chrome-ex'
            });

            data[0].map(i => i[0][0][0]).forEach((text, index) => (fileData[translationKeys[index]] = text));
            fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), { encoding: 'utf8' });
        }
    }
})();

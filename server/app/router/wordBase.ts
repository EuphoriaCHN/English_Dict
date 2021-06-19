import { Application } from 'egg';

export default (app: Application) => {
    const { controller, middleware } = app;

    const router = app.router.namespace('/wb');

    router.get('/getWordBaseByUserID', middleware.auth, controller.wordBase.getWordBaseByUserID);
    router.post('/createWordBaseWord', middleware.auth, controller.wordBase.createWordBaseWord);
    router.delete('/deleteWordBaseWord', middleware.auth, controller.wordBase.deleteWordBaseWord);
};

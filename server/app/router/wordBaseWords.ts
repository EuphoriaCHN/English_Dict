import { Application } from 'egg';

export default (app: Application) => {
    const { controller, middleware } = app;

    const router = app.router.namespace('/wbw');

    router.get('/getWordBaseWords', middleware.auth, controller.wordBaseWords.getWordBaseWords);
};

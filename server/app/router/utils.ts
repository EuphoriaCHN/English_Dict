import { Application } from 'egg';

export default (app: Application) => {
    const { controller, middleware } = app;

    const router = app.router.namespace('/utils');

    router.get('/universalTranslate', middleware.auth, controller.utils.universalTranslate);
};

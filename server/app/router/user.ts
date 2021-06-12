import { Application } from 'egg';

export default (app: Application) => {
    const { controller } = app;

    const router = app.router.namespace('/user');

    router.post('/accountLogin', controller.user.accountLogin);
};

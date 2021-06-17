import { Application } from 'egg';

export default (app: Application) => {
    const { controller, middleware } = app;

    const router = app.router.namespace('/user');

    router.post('/accountLogin', controller.user.accountLogin);
    router.get('/verificationUserLoginJWT', middleware.auth, controller.user.verificationUserLoginJWT);
};

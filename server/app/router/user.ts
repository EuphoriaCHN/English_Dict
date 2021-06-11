import { Application } from 'egg';

export default (app: Application) => {
    const controller = app.controller;

    const router = app.router.namespace('/user');

    router.get('/accountLogin', controller.user.accountLogin);
};

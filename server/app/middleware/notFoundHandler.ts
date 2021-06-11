import { Context } from 'egg';

export default function (_options: any) {
    return async function (ctx: Context, next: () => Promise<any>) {
        if (ctx.status === 404) {
            throw new global.ServerError('NOT_FOUND', 'Not Found');
        }

        return await next();
    }
}

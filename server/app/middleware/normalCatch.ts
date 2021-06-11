import { Context } from 'egg';

export default function (_options: any) {
    return async function (ctx: Context, next: () => Promise<any>) {
        let statusCode = global.STATUS_CODE.SUCCESS;
        let data: any = null;
        let errorMessage: string | null = null;

        try {
            data = await next();
            ctx.logger.info('');
        } catch (err) {
            if (err instanceof global.ServerError) {
                statusCode = global.STATUS_CODE[err.statusKey];
            } else {
                statusCode = global.STATUS_CODE.COMMON_ERROR;
            }
            // ctx.logger.error(err.message);
            errorMessage = err.message;
        }

        ctx.body = {
            data,
            statusCode,
            errorMessage
        };
    }
}

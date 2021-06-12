import { Context } from 'egg';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export default {
    /**
     * 哈希加密
     */
    sha256(data: string | Buffer): string {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    },
    /**
     * 生成 JWT
     */
    signJWT(data: string | object | Buffer): string {
        return jwt.sign(data, global.JWT_SECRET, { algorithm: 'HS256', expiresIn: '365d' });
    },
    /**
     * 解密 JWT
     */
    verifyJWT<T = any>(token: string): T {
        return jwt.verify(token, global.JWT_SECRET, { algorithms: ['HS256'] }) as any;
    },
    /**
     * 生成 redis 鉴权 user 是否登录的 key："login_flag_<userID>"
     */
    getLoginRedisKey(userID: number | string) {
        return `login_flag_${userID}`;
    },
    /**
     * 获取 Header 中的 Authorization 值
     */
    getAuthorizationValue(ctx: Context): string | undefined {
        return ctx.headers[global.AUTH_HTTP_HEADER_KEY] as any;
    }
};
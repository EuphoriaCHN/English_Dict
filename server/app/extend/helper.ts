import * as crypto from 'crypto';

export default {
    sha256(data: string | Buffer) {
        const hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest('hex');
    }
};
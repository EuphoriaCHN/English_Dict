// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportUser from '../../../app/service/user';
import ExportWordBase from '../../../app/service/wordBase';
import ExportWordBaseWords from '../../../app/service/wordBaseWords';

declare module 'egg' {
  interface IService {
    user: AutoInstanceType<typeof ExportUser>;
    wordBase: AutoInstanceType<typeof ExportWordBase>;
    wordBaseWords: AutoInstanceType<typeof ExportWordBaseWords>;
  }
}

// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportNormalCatch from '../../../app/middleware/normalCatch';
import ExportNotFoundHandler from '../../../app/middleware/notFoundHandler';

declare module 'egg' {
  interface IMiddleware {
    normalCatch: typeof ExportNormalCatch;
    notFoundHandler: typeof ExportNotFoundHandler;
  }
}

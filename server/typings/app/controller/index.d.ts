// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser from '../../../app/controller/user';
import ExportUtils from '../../../app/controller/utils';
import ExportWordBase from '../../../app/controller/wordBase';
import ExportWordBaseWords from '../../../app/controller/wordBaseWords';

declare module 'egg' {
  interface IController {
    user: ExportUser;
    utils: ExportUtils;
    wordBase: ExportWordBase;
    wordBaseWords: ExportWordBaseWords;
  }
}

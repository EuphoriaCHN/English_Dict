// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEnglishDictUsers from '../../../app/model/englishDictUsers';
import ExportEnglishDictWordBase from '../../../app/model/englishDictWordBase';
import ExportEnglishDictWordBaseWords from '../../../app/model/englishDictWordBaseWords';
import ExportInitModels from '../../../app/model/init-models';

declare module 'egg' {
  interface IModel {
    EnglishDictUsers: typeof ExportEnglishDictUsers;
    EnglishDictWordBase: typeof ExportEnglishDictWordBase;
    EnglishDictWordBaseWords: typeof ExportEnglishDictWordBaseWords;
    InitModels: typeof ExportInitModels;
  }
}

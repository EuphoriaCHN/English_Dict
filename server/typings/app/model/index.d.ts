// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEnglishDictUsers from '../../../app/model/englishDictUsers';
import ExportInitModels from '../../../app/model/init-models';

declare module 'egg' {
  interface IModel {
    EnglishDictUsers: typeof ExportEnglishDictUsers;
    InitModels: typeof ExportInitModels;
  }
}

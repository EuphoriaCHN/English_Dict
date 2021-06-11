import type { Sequelize, Model } from "sequelize";
import { EnglishDictUsers } from "./englishDictUsers";
import type { EnglishDictUsersAttributes, EnglishDictUsersCreationAttributes } from "./englishDictUsers";

export {
  EnglishDictUsers,
};

export type {
  EnglishDictUsersAttributes,
  EnglishDictUsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  EnglishDictUsers.initModel(sequelize);


  return {
    EnglishDictUsers: EnglishDictUsers,
  };
}

import type { Sequelize, Model } from "sequelize";
import { EnglishDictUsers } from "./englishDictUsers";
import type { EnglishDictUsersAttributes, EnglishDictUsersCreationAttributes } from "./englishDictUsers";
import { EnglishDictWordBase } from "./englishDictWordBase";
import type { EnglishDictWordBaseAttributes, EnglishDictWordBaseCreationAttributes } from "./englishDictWordBase";
import { EnglishDictWordBaseWords } from "./englishDictWordBaseWords";
import type { EnglishDictWordBaseWordsAttributes, EnglishDictWordBaseWordsCreationAttributes } from "./englishDictWordBaseWords";

export {
  EnglishDictUsers,
  EnglishDictWordBase,
  EnglishDictWordBaseWords,
};

export type {
  EnglishDictUsersAttributes,
  EnglishDictUsersCreationAttributes,
  EnglishDictWordBaseAttributes,
  EnglishDictWordBaseCreationAttributes,
  EnglishDictWordBaseWordsAttributes,
  EnglishDictWordBaseWordsCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  EnglishDictUsers.initModel(sequelize);
  EnglishDictWordBase.initModel(sequelize);
  EnglishDictWordBaseWords.initModel(sequelize);

  EnglishDictWordBase.belongsTo(EnglishDictUsers, { as: "owner", foreignKey: "ownerId"});
  EnglishDictUsers.hasMany(EnglishDictWordBase, { as: "englishDictWordBases", foreignKey: "ownerId"});

  return {
    EnglishDictUsers: EnglishDictUsers,
    EnglishDictWordBase: EnglishDictWordBase,
    EnglishDictWordBaseWords: EnglishDictWordBaseWords,
  };
}

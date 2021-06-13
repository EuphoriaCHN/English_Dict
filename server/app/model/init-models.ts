import type { Sequelize, Model } from "sequelize";
import { EnglishDictUsers } from "./englishDictUsers";
import type { EnglishDictUsersAttributes, EnglishDictUsersCreationAttributes } from "./englishDictUsers";
import { EnglishDictWordBase } from "./englishDictWordBase";
import type { EnglishDictWordBaseAttributes, EnglishDictWordBaseCreationAttributes } from "./englishDictWordBase";

export {
  EnglishDictUsers,
  EnglishDictWordBase,
};

export type {
  EnglishDictUsersAttributes,
  EnglishDictUsersCreationAttributes,
  EnglishDictWordBaseAttributes,
  EnglishDictWordBaseCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  EnglishDictUsers.initModel(sequelize);
  EnglishDictWordBase.initModel(sequelize);

  EnglishDictWordBase.belongsTo(EnglishDictUsers, { as: "owner", foreignKey: "ownerId"});
  EnglishDictUsers.hasMany(EnglishDictWordBase, { as: "englishDictWordBases", foreignKey: "ownerId"});

  return {
    EnglishDictUsers: EnglishDictUsers,
    EnglishDictWordBase: EnglishDictWordBase,
  };
}

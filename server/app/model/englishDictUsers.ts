import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EnglishDictUsersAttributes {
  id: number;
  userName: string;
}

export type EnglishDictUsersPk = 'id';
export type EnglishDictUsersId = EnglishDictUsers[EnglishDictUsersPk];
export type EnglishDictUsersCreationAttributes = Optional<
  EnglishDictUsersAttributes,
  EnglishDictUsersPk
>;

export class EnglishDictUsers
  extends Model<EnglishDictUsersAttributes, EnglishDictUsersCreationAttributes>
  implements EnglishDictUsersAttributes
{
  id!: number;
  userName!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof EnglishDictUsers {
    EnglishDictUsers.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        userName: {
          type: DataTypes.STRING(32),
          allowNull: false,
          field: 'user_name',
        },
      },
      {
        sequelize,
        tableName: 'english_dict_users',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
    return EnglishDictUsers;
  }
}

export default EnglishDictUsers;

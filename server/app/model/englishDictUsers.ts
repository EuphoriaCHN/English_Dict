import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EnglishDictUsersAttributes {
  id: number;
  nickName: string;
  account?: string;
  password?: string;
  createTime?: Date;
  updateTime?: Date;
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
  nickName!: string;
  account?: string;
  password?: string;
  createTime?: Date;
  updateTime?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof EnglishDictUsers {
    EnglishDictUsers.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        nickName: {
          type: DataTypes.STRING(32),
          allowNull: false,
          field: 'nick_name',
        },
        account: {
          type: DataTypes.STRING(32),
          allowNull: false,
          defaultValue: '',
          unique: 'i_user_account_unique',
        },
        password: {
          type: DataTypes.STRING(256),
          allowNull: false,
          defaultValue: '',
        },
        createTime: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
          field: 'create_time',
        },
        updateTime: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
          field: 'update_time',
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
          {
            name: 'i_user_account_unique',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'account' }],
          },
        ],
      }
    );
    return EnglishDictUsers;
  }
}

export default EnglishDictUsers;

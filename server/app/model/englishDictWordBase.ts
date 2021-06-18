import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EnglishDictUsers, EnglishDictUsersId } from './englishDictUsers';

export interface EnglishDictWordBaseAttributes {
  id: number;
  name: string;
  createTime?: Date;
  updateTime?: Date;
  ownerId: number;
  sourceLang?: string;
  targetLang: string;
}

export type EnglishDictWordBasePk = 'id';
export type EnglishDictWordBaseId = EnglishDictWordBase[EnglishDictWordBasePk];
export type EnglishDictWordBaseCreationAttributes = Optional<
  EnglishDictWordBaseAttributes,
  EnglishDictWordBasePk
>;

export class EnglishDictWordBase
  extends Model<
    EnglishDictWordBaseAttributes,
    EnglishDictWordBaseCreationAttributes
  >
  implements EnglishDictWordBaseAttributes
{
  id!: number;
  name!: string;
  createTime?: Date;
  updateTime?: Date;
  ownerId!: number;
  sourceLang?: string;
  targetLang!: string;

  // EnglishDictWordBase belongsTo EnglishDictUsers via ownerId
  owner!: EnglishDictUsers;
  getOwner!: Sequelize.BelongsToGetAssociationMixin<EnglishDictUsers>;
  setOwner!: Sequelize.BelongsToSetAssociationMixin<
    EnglishDictUsers,
    EnglishDictUsersId
  >;
  createOwner!: Sequelize.BelongsToCreateAssociationMixin<EnglishDictUsers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EnglishDictWordBase {
    EnglishDictWordBase.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(32),
          allowNull: false,
          comment: '词库名称',
        },
        createTime: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '词库创建时间',
          field: 'create_time',
        },
        updateTime: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '词库更新时间',
          field: 'update_time',
        },
        ownerId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          comment: '所属用户 ID',
          references: {
            model: 'english_dict_users',
            key: 'id',
          },
          field: 'owner_id',
        },
        sourceLang: {
          type: DataTypes.STRING(16),
          allowNull: false,
          defaultValue: '',
          comment: '源语言',
          field: 'source_lang',
        },
        targetLang: {
          type: DataTypes.STRING(16),
          allowNull: false,
          comment: '目标语言',
          field: 'target_lang',
        },
      },
      {
        sequelize,
        tableName: 'english_dict_word_base',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'f_word_base_users_id',
            using: 'BTREE',
            fields: [{ name: 'owner_id' }],
          },
        ],
      }
    );
    return EnglishDictWordBase;
  }
}

export default EnglishDictWordBase;

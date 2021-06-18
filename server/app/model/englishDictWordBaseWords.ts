import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EnglishDictWordBaseWordsAttributes {
  id: number;
  ownerBaseId: number;
  createTime?: Date;
  examCount?: number;
  passCount?: number;
  content: string;
  translationResult: string;
}

export type EnglishDictWordBaseWordsPk = 'id';
export type EnglishDictWordBaseWordsId =
  EnglishDictWordBaseWords[EnglishDictWordBaseWordsPk];
export type EnglishDictWordBaseWordsCreationAttributes = Optional<
  EnglishDictWordBaseWordsAttributes,
  EnglishDictWordBaseWordsPk
>;

export class EnglishDictWordBaseWords
  extends Model<
    EnglishDictWordBaseWordsAttributes,
    EnglishDictWordBaseWordsCreationAttributes
  >
  implements EnglishDictWordBaseWordsAttributes
{
  id!: number;
  ownerBaseId!: number;
  createTime?: Date;
  examCount?: number;
  passCount?: number;
  content!: string;
  translationResult!: string;

  static initModel(
    sequelize: Sequelize.Sequelize
  ): typeof EnglishDictWordBaseWords {
    EnglishDictWordBaseWords.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        ownerBaseId: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          comment: '所属词库 id',
          field: 'owner_base_id',
        },
        createTime: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '加入到词库中的时间',
          field: 'create_time',
        },
        examCount: {
          type: DataTypes.SMALLINT.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '被出题次数',
          field: 'exam_count',
        },
        passCount: {
          type: DataTypes.SMALLINT.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          comment: '通过次数',
          field: 'pass_count',
        },
        content: {
          type: DataTypes.STRING(128),
          allowNull: false,
          comment: '单词值（原文）',
        },
        translationResult: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: '有道翻译结果 JSON',
          field: 'translation_result',
        },
      },
      {
        sequelize,
        tableName: 'english_dict_word_base_words',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }],
          },
          {
            name: 'i_words_unique',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'owner_base_id' }, { name: 'content' }],
          },
        ],
      }
    );
    return EnglishDictWordBaseWords;
  }
}

export default EnglishDictWordBaseWords;

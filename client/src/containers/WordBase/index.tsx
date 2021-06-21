import React from 'react';
import { useTranslation } from 'react-i18next';
import { WordBaseAPI, WordBaseWordsAPI } from '@/api';
import { getPaginationData, safeParse, formatTime, useWindowResize } from '@/common/utils';

import { message, Spin, Select, Form, Table, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, DeleteFilled, SoundFilled } from '@ant-design/icons';

import { ColumnsType } from 'antd/lib/table/interface';

import './index.scss';

function WordBase() {
    const [words, setWords] = React.useState<WordBaseWord[]>([]);
    const [wordBases, setWordBases] = React.useState<WordBase[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    const [total, setTotal] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const { t } = useTranslation();
    const [_form] = Form.useForm();

    const getWords = React.useCallback(async (_currentPage?: number, _pageSize: number = 10) => {
        const { wordBase: wordBaseID } = _form.getFieldsValue(['wordBase']);
        const { limit, offset } = getPaginationData(_currentPage || currentPage, _pageSize);

        setLoading(true);
        try {
            const { count, rows } = await WordBaseWordsAPI.getWordBaseWords({ wordBaseID, limit, offset });
            setTotal(count);
            setWords(rows);
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
            message.error(t('获取词库词语失败'));
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useWindowResize(function (ev) {
        console.log(document.documentElement.clientWidth);

    }, 200);

    const tableColumns = React.useMemo<ColumnsType<WordBaseWord>>(() => [{
        title: t('原文'),
        dataIndex: 'content',
        key: 'content',
    }, {
        title: t('译文'),
        render(_, item) {
            return safeParse<EN2ZHTranslationResult>(item.translationResult).translation[0];
        },
    }, {
        title: t('创建时间'),
        render(_, item) {
            item.passCount
            return formatTime(item.createTime);
        }
    }, {
        title: t('测试 / 通过比'),
        render(_, item) {
            return `${item.examCount}/${item.passCount}`;
        }
    }, {
        title: t('更多操作'),
        render(_, item) {
            return (
                <Dropdown
                    overlay={(
                        <Menu>
                            <Menu.Item icon={<SoundFilled />}>{t('发音')}</Menu.Item>
                            <Menu.Item icon={<DeleteFilled />} danger>{t('删除')}</Menu.Item>
                        </Menu>
                    )}
                >
                    <Button type={'text'} icon={<EllipsisOutlined />} />
                </Dropdown>
            );
        }
    }], []);

    React.useEffect(() => {
        setLoading(true);

        WordBaseAPI.getUserWordBases().then(val => {
            if (Array.isArray(val) && !!val.length) {
                const initValue: WordBase = val[0];
                _form.setFields([{ name: 'wordBase', value: initValue.id }]);
                setWordBases(val);
                getWords();
            } else {
                message.warning(t('当前用户没有词库'));
                setLoading(false);
            }
        }, err => {
            message.error(err.message || JSON.stringify(err));
            message.error(t('获取用户词库失败'));
            setLoading(false);
        });
    }, []);

    const renderHeader = React.useMemo(() => (
        <header className={'word-base-header'}>
            <Form form={_form}>
                <Form.Item name={'wordBase'} noStyle>
                    <Select>
                        {wordBases.map(item => (
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </header>
    ), [wordBases]);

    const renderTable = React.useMemo(() => (
        <Table dataSource={words} columns={tableColumns} />
    ), [words]);

    return (
        <div className={'container word-base'}>
            <Spin spinning={loading}>
                {renderHeader}
                {renderTable}
            </Spin>
        </div>
    );
}

export default WordBase

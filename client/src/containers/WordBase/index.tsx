import React from 'react';
import { useTranslation } from 'react-i18next';
import { WordBaseWordsAPI } from '@/api';
import { getPaginationData, safeParse, formatTime, useWindowResize } from '@/common/utils';

import WordBaseSelector from '@/components/WordBaseSelector';
import { message, Spin, Table, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, DeleteFilled, SoundFilled } from '@ant-design/icons';

import { PaginationProps } from 'antd/lib/pagination/Pagination';
import { ColumnsType } from 'antd/lib/table/interface';

import './index.scss';

function WordBase() {
    const [words, setWords] = React.useState<WordBaseWord[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isMiniScreen, setIsMiniScreen] = React.useState<boolean>(false);
    const [selectedWordBaseID, setSelectedWordBaseID] = React.useState<number>(0);

    const [total, setTotal] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const { t } = useTranslation();

    const getWords = React.useCallback(async (_currentPage?: number, _pageSize: number = 10) => {
        const { limit, offset } = getPaginationData(_currentPage || currentPage, _pageSize);

        setLoading(true);
        try {
            const { count, rows } = await WordBaseWordsAPI.getWordBaseWords({ wordBaseID: selectedWordBaseID, limit, offset });
            setTotal(count);
            setWords(rows);
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
            message.error(t('获取词库词语失败'));
        } finally {
            setLoading(false);
        }
    }, [currentPage, selectedWordBaseID]);

    const tableColumns = React.useMemo<ColumnsType<WordBaseWord>>(() => [{
        title: t('原文'),
        dataIndex: 'content',
        key: 'content',
        width: isMiniScreen ? 84 : undefined,
        fixed: isMiniScreen ? 'left' : undefined
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
        },
        width: isMiniScreen ? 102 : undefined
    }, {
        title: t('测试 / 通过比'),
        render(_, item) {
            return `${item.examCount}/${item.passCount}`;
        },
        width: isMiniScreen ? 120 : undefined
    }, {
        title: '',
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
        },
        width: 64,
        fixed: isMiniScreen ? 'right' : undefined
    }], [isMiniScreen]);

    const handleOnWindowResize = React.useCallback(() => {
        const clientWidth = document.documentElement.clientWidth;
        const isMiniScreen = clientWidth < 768;

        setIsMiniScreen(isMiniScreen);

        if (clientWidth < 414) {
            message.warn(t('为了获得更好的体验，请横屏使用'));
        }
    }, []);

    const handleTablePagination = React.useCallback<Required<PaginationProps>['onChange']>(current => {
        setCurrentPage(current);
        getWords(current);
    }, []);

    useWindowResize(handleOnWindowResize, 200);

    React.useEffect(() => {
        // 要等到 renderHeader 中 word base selector 进行初始化的 onSelect 后再去拉取 words
        if (!selectedWordBaseID) {
            return;
        }
        setTimeout(getWords);
    }, [selectedWordBaseID]);

    const renderHeader = React.useMemo(() => (
        <header className={'word-base-header'}>
            <WordBaseSelector onSelect={id => setSelectedWordBaseID(id)} />
        </header>
    ), []);

    const renderTable = React.useMemo(() => (
        <Table
            className={'word-base-table'}
            dataSource={words}
            columns={tableColumns}
            scroll={isMiniScreen ? { x: 450 } : undefined}
            pagination={{ total, current: currentPage, onChange: handleTablePagination }}
            bordered
        />
    ), [words, isMiniScreen, tableColumns, total, currentPage]);

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

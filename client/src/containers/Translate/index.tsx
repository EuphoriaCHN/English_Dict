import React from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash-es/debounce';
import classnames from 'classnames';
import { UtilsAPI } from '@/api';

import { Input, Select, Tooltip, message, Button } from 'antd';
import { SwapOutlined, SoundOutlined, CopyOutlined, StarOutlined } from '@ant-design/icons';

import mock from './mock.json';

import './index.scss';

function Translate() {
    const [translationResult, setTranslationResult] = React.useState<EN2ZHTranslationResult | null>(null);
    const { t } = useTranslation();

    const handleTextAreaChange = React.useCallback(debounce(async (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = ev.target.value.trim();

        if (!value) {
            setTranslationResult(null);
            return;
        }

        if (value.split(/[^a-zA-Z-]/).length !== 1) {
            message.warn(t('目前仅支持单个英文单词翻译'));
            setTranslationResult(null);
            return;
        }

        try {
            // const data = await UtilsAPI.universalTranslate({ input: value });
            // setTranslationResult(data);

            await new Promise(resolve => setTimeout(resolve, 1000));
            setTranslationResult(mock as any);
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
            message.error(t('机器翻译失败'));
        }
    }, 500), []);

    const renderHeader = React.useMemo(() => (
        <div className={'translate-header'}>
            <Tooltip title={t('目前源语言只支持英语')}>
                <Select className={'translate-header-selection'} defaultValue={'en-US'} disabled>
                    <Select.Option value={'en-US'}>English</Select.Option>
                </Select>
            </Tooltip>
            <SwapOutlined />
            <Tooltip title={t('目前目标语言只支持简体中文')}>
                <Select className={'translate-header-selection'} defaultValue={'zh-CN'} disabled>
                    <Select.Option value={'zh-CN'}>简体中文</Select.Option>
                </Select>
            </Tooltip>
        </div>
    ), []);

    const renderResultBox = React.useMemo(() => (
        <div className={'translate-box'}>
            <div className={'translate-input'}>
                <Input.TextArea placeholder={t('输入单个需要翻译的英文单词...')} onChange={handleTextAreaChange} rows={5} autoSize={false} />
                <div className={classnames('translate-opts translate-opt-buttons', {
                    'el-hidden': !translationResult
                })}>
                    <Tooltip title={t('发音')}>
                        <Button icon={<SoundOutlined />} type={'link'} />
                    </Tooltip>
                    <Tooltip title={t('收藏')}>
                        <Button icon={<StarOutlined />} type={'link'} />
                    </Tooltip>
                </div>
            </div>
            <div className={'translate-result'}>
                <div className={classnames('translate-result-text', {
                    'el-hidden': !translationResult
                })}>{(translationResult?.translation || [''])[0]}</div>
                <div className={classnames('translate-result-opts translate-opt-buttons', {
                    'el-hidden': !translationResult
                })}>
                    <Tooltip title={t('发音')}>
                        <Button icon={<SoundOutlined />} type={'link'} />
                    </Tooltip>
                    <Tooltip title={t('复制')}>
                        <Button icon={<CopyOutlined />} type={'link'} />
                    </Tooltip>
                </div>
            </div>
        </div>
    ), [translationResult]);

    const renderMoreResult = React.useMemo(() => (
        <div className={classnames('translate-more', { 'el-hidden': !translationResult })}>
            <div className={'translate-more-text'}>{translationResult?.query}</div>
            <div className={'translate-more-phonetic'}>
                {[translationResult?.basic['us-phonetic'], translationResult?.basic['uk-phonetic']].map(phonetic => (
                    <span></span>
                ))}
            </div>
        </div>
    ), [translationResult]);

    return (
        <div className={'container'}>
            <div className={'translate'}>
                {renderHeader}
                {renderResultBox}
                {renderMoreResult}
            </div>
        </div>
    );
}

export default Translate;

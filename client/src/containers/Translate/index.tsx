import React from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash-es/debounce';
import classnames from 'classnames';
import { UtilsAPI } from '@/api';

import { Input, Select, Tooltip, message, Button, Tag } from 'antd';
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

            await new Promise(resolve => setTimeout(resolve, 500));
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

    const renderPhonetic = React.useMemo(() => {
        if (!translationResult || !translationResult.basic) {
            return;
        }
        const usPhonetic = translationResult.basic['us-phonetic'];
        const ukPhonetic = translationResult.basic['uk-phonetic'];

        const usSpeech = translationResult.basic['us-speech'];
        const ukSpeech = translationResult.basic['uk-speech'];

        const data: any[] = [];

        if (!!usPhonetic) {
            data.push({ key: 'us', phonetic: usPhonetic, title: '美' });
        }
        if (!!ukPhonetic) {
            data.push({ key: 'uk', phonetic: ukPhonetic, title: '英' });
        }

        if (!data.length) {
            return null;
        }

        return (
            <React.Fragment>
                {data.map(item => (
                    <span key={item.key} className={'translate-more-phonetic-item'}>
                        <b>{item.title}</b>
                        <span>[{item.phonetic}]</span>
                        <Tooltip title={t('发音')}>
                            <Button size={'small'} icon={<SoundOutlined />} type={'link'} />
                        </Tooltip>
                    </span>
                ))}
            </React.Fragment>
        );
    }, [translationResult]);

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

    const renderMoreResult = React.useMemo(() => {
        if (!translationResult) {
            return null;
        }
        return (
            <div className={classnames('translate-more', { 'el-hidden': !translationResult })}>
                <div className={'translate-more-text'}>{translationResult?.query}</div>
                <div className={'translate-more-phonetic'}>
                    {renderPhonetic}
                </div>
                <div className={'translate-more-explains'}>
                    {(translationResult.basic.explains || []).map(explain => {
                        const [part, ...labelArr] = explain.split(/ /);
                        const label = labelArr.join(' ');
                        return (
                            <p key={label}>
                                <span>{part}</span>
                                <span>{label}</span>
                            </p>
                        );
                    })}
                </div>
                <div className={'translate-more-wfs'}>
                    {(translationResult.basic.wfs || []).map(({ wf }) => (
                        <span>{wf.name}：{wf.value}</span>
                    ))}
                </div>
                <div className={'translate-more-exam'}>
                    {(translationResult.basic.exam_type || []).map(type => (
                        <Tag key={`${translationResult.query}-${type}`}>{type}</Tag>
                    ))}
                </div>
            </div>
        );
    }, [translationResult, renderPhonetic]);

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

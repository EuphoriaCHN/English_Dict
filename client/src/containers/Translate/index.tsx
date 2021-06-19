import React from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash-es/debounce';
import classnames from 'classnames';
import { UtilsAPI, WordBaseAPI } from '@/api';
import { handleSoundVoiceOnMouseEnter, handleCopyText } from '@/common/utils';

import SelectWordBaseModel from '@/components/SelectWordBaseModel';
import { Input, Select, Tooltip, message, Button, Tag, Descriptions } from 'antd';
import { SwapOutlined, SoundOutlined, CopyOutlined, StarOutlined, StarFilled } from '@ant-design/icons';

import mock from './mock.json';

import './index.scss';

function Translate(this: any) {
    const [addToWordBaseModelText, setAddToWordBaseModelText] = React.useState<string>('');
    const [removeFromWordBaseModelData, setRemoveFromWordBaseModelData] = React.useState<any[]>([]);

    const [translationResult, setTranslationResult] = React.useState<EN2ZHTranslationResult | null>(null);
    const [existsWordBases, setExistsWordBases] = React.useState<any[]>([]);

    const audioRef = React.useRef<HTMLAudioElement>(null);

    const { t } = useTranslation();

    /**
     * 添加当前文案到词库
     */
    const handleAddTextToWordBase = React.useCallback(async (wordBaseID: number) => {
        const insertData = await WordBaseAPI.createWordBaseWord({
            wordBaseID,
            trans: translationResult
        });
        setExistsWordBases(prev => prev.concat([insertData]));
        message.success(t('创建成功'));
    }, [translationResult]);

    /**
     * 从词库中删除当前翻译的词
     */
    const handleDeleteTextFromWordBase = React.useCallback(async (wordBaseID: number, nowSelectData: any) => {
        await WordBaseAPI.deleteWordBaseWord({
            wordBaseID, 
            content: nowSelectData.content, 
            ID: nowSelectData.wordBaseWordID
        });
        message.success(t('删除成功'));
        setExistsWordBases(prev => {
            return prev.filter(item => item.wordBaseWordID !== nowSelectData.wordBaseWordID)
        });
    }, []);

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
            const { transData, existsWordBases } = await UtilsAPI.universalTranslate({ input: value });
            setTranslationResult(transData);
            setExistsWordBases(existsWordBases);

            // await new Promise(resolve => setTimeout(resolve, 500));
            // setTranslationResult(mock as any);
            // setExistsWordBases([{ id: 1, name: '默认词库', content: 'hello', wordCreateTime: '2021-06-19 02:21:54', examCount: 0, passCount: 0, wordBaseWordID: 1 }]);
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
            data.push({ key: 'us', phonetic: usPhonetic, title: '美', speech: usSpeech });
        }
        if (!!ukPhonetic) {
            data.push({ key: 'uk', phonetic: ukPhonetic, title: '英', speech: ukSpeech });
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
                            <Button
                                onMouseEnter={handleSoundVoiceOnMouseEnter(item.speech, audioRef.current)}
                                size={'small'}
                                icon={<SoundOutlined />}
                                type={'link'}
                            />
                        </Tooltip>
                    </span>
                ))}
            </React.Fragment>
        );
    }, [translationResult]);

    const renderResultBox = React.useMemo(() => {
        const exists = !!existsWordBases.length;
        const query = translationResult?.query || '';
        const translation = (translationResult?.translation || [''])[0];

        return (
            <div className={'translate-box'}>
                <div className={'translate-input'}>
                    <Input.TextArea placeholder={t('输入单个需要翻译的英文单词...')} onChange={handleTextAreaChange} rows={5} autoSize={false} />
                    <div className={classnames('translate-opts translate-opt-buttons', {
                        'el-hidden': !translationResult
                    })}>
                        <Tooltip title={t('发音')}>
                            <Button
                                icon={<SoundOutlined />}
                                type={'link'}
                                onMouseEnter={handleSoundVoiceOnMouseEnter(translationResult?.speakUrl || '', audioRef.current)}
                            />
                        </Tooltip>
                        <Tooltip title={exists ? t('从词库中移除') : t('添加到词库')}>
                            <Button
                                className={classnames({
                                    'exists-in-word-base': exists
                                })}
                                icon={exists ? <StarFilled /> : <StarOutlined />}
                                type={'link'}
                                onClick={exists ? setRemoveFromWordBaseModelData.bind(this, existsWordBases) : setAddToWordBaseModelText.bind(this, query)}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className={'translate-result'}>
                    <div className={classnames('translate-result-text', {
                        'el-hidden': !translationResult
                    })}>{translation}</div>
                    <div className={classnames('translate-result-opts translate-opt-buttons', {
                        'el-hidden': !translationResult
                    })}>
                        <Tooltip title={t('发音')}>
                            <Button
                                icon={<SoundOutlined />}
                                type={'link'}
                                onMouseEnter={handleSoundVoiceOnMouseEnter(translationResult?.tSpeakUrl || '', audioRef.current)}
                            />
                        </Tooltip>
                        <Tooltip title={t('复制')}>
                            <Button
                                icon={<CopyOutlined />}
                                type={'link'}
                                onClick={handleCopyText(translation, () => message.success(t('复制成功')))}
                            />
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }, [translationResult, existsWordBases]);

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
                    {(translationResult.basic.wfs || []).map(({ wf }, index) => (
                        <span key={`${translationResult.query}-${wf.value}-${index}`}>
                            {wf.name}：{wf.value}
                        </span>
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

    const renderDeleteWordFromWordBaseModelContent = React.useCallback((defaultElement: JSX.Element, nowSelectData: any) => {
        if (!nowSelectData) {
            return defaultElement;
        }
        return (
            <React.Fragment>
                {defaultElement}
                <Descriptions title={''} bordered style={{ marginTop: 12 }}>
                    <Descriptions.Item span={2} label={t('文案')}>{nowSelectData.content}</Descriptions.Item>
                    <Descriptions.Item span={2} label={t('创建时间')}>{nowSelectData.wordCreateTime}</Descriptions.Item>
                    <Descriptions.Item span={2} label={t('出题次数')}>{nowSelectData.examCount}</Descriptions.Item>
                    <Descriptions.Item span={2} label={t('正确次数')}>{nowSelectData.passCount}</Descriptions.Item>
                </Descriptions>
            </React.Fragment>
        );
    }, []);

    return (
        <React.Fragment>
            <div className={'container'}>
                <div className={'translate'}>
                    {renderHeader}
                    {renderResultBox}
                    {renderMoreResult}
                </div>
                <audio ref={audioRef} style={{ display: 'none' }} />
            </div>
            <SelectWordBaseModel
                visible={!!addToWordBaseModelText}
                onCancel={setAddToWordBaseModelText.bind(this, '')}
                label={t('将单词 "{_nowInputText}" 添加到哪个词库', {
                    _nowInputText: addToWordBaseModelText
                })}
                onOk={handleAddTextToWordBase}
            />
            <SelectWordBaseModel
                visible={!!removeFromWordBaseModelData.length}
                onCancel={setRemoveFromWordBaseModelData.bind(this, [])}
                label={t('请选择从哪个词库中移除')}
                onOk={handleDeleteTextFromWordBase}
                data={removeFromWordBaseModelData}
                renderContent={renderDeleteWordFromWordBaseModelContent}
                okText={t('删除')}
                okButtonProps={{ danger: true }}
            />
        </React.Fragment>
    );
}

export default Translate;

import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import WordBaseSelector from '@/components/WordBaseSelector';
import { Modal, Spin, message, Typography } from 'antd';

import { ButtonProps } from 'antd/lib/button/button';

import './index.scss';

export interface ISelectWordBaseModelProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (wordBaseID: number, nowSelectData: WordBase | null) => Promise<unknown>;

    /**
     * @default "请选择词库"
     */
    label?: string;
    /**
     * @default "取消"
     */
    cancelText?: string;
    /**
     * @default "添加"
     */
    okText?: string;
    okButtonProps?: Omit<ButtonProps, 'loading'>;

    /**
     * 自定义数据
     */
    data?: WordBase[];

    /**
     * 接管 Content 渲染
     */
    renderContent?: (defaultElement: JSX.Element, nowSelectData: WordBase | null) => JSX.Element;

    className?: string;
}

function SelectWordBaseModel(props: ISelectWordBaseModelProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectWordBase, setSelectWordBase] = React.useState<WordBase | null>(null);

    const { t } = useTranslation();

    const handleOnOK = React.useCallback(async () => {
        if (!selectWordBase) {
            message.warn(t('未选择词库'));
            return;
        }
        try {
            setLoading(true);
            await props.onOk(selectWordBase.id, selectWordBase);
            setTimeout(props.onCancel);
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    }, [props.onOk, selectWordBase]);

    const renderContent = React.useMemo(() => {
        const defaultContent = (
            <React.Fragment>
                <Typography.Title
                    className={'select-word-base-model-label'}
                    level={4}
                >
                    {props.label || t('请选择词库')}
                </Typography.Title>
                <WordBaseSelector data={props.data} onSelect={(_, wb) => setSelectWordBase(wb)} />
            </React.Fragment>
        );

        if (typeof props.renderContent === 'function') {
            return props.renderContent(defaultContent, selectWordBase);
        }

        return defaultContent;
    }, [props.renderContent, selectWordBase]);

    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={handleOnOK}
            title={t('选择词库')}
            okText={props.okText || t('添加')}
            cancelText={props.cancelText || t('取消')}
            okButtonProps={Object.assign(props.okButtonProps || {}, { loading })}
            cancelButtonProps={{ disabled: loading }}
            className={classnames('select-word-base-model', props.className)}
        >
            <Spin spinning={loading}>
                {renderContent}
            </Spin>
        </Modal>
    );
}

export default SelectWordBaseModel;

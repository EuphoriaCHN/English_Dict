import React from 'react';
import { useTranslation } from 'react-i18next';
import { WordBaseAPI } from '@/api';
import classnames from 'classnames';

import { useSelector } from 'react-redux';
import { Store } from '@/store';

import { Modal, Spin, Select, Form, message, Typography } from 'antd';

import { ButtonProps } from 'antd/lib/button/button';

import './index.scss';

export interface ISelectWordBaseModelProps<T extends { id: number; name: string }> {
    visible: boolean;
    onCancel: () => void;
    onOk: (wordBaseID: number, nowSelectData: T | null) => Promise<unknown>;

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
    data?: T[];

    /**
     * 接管 Content 渲染
     */
    renderContent?: (defaultElement: JSX.Element, nowSelectData: T | null) => JSX.Element;

    className?: string;
}

function SelectWordBaseModel<T extends { id: number; name: string } = WordBase>(props: ISelectWordBaseModelProps<T>) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [userWordBase, setUserWordBase] = React.useState<T[]>([]);
    const [nowSelectData, setNowSelectData] = React.useState<T | null>(null);

    const { t } = useTranslation();
    const [_form] = Form.useForm();

    const userStore = useSelector<Store, Store['user']>(state => state.user);

    const handleOnSelect = React.useCallback((selectID: number, _data?: T[]) => {
        const wb = Array.isArray(_data) ? _data : userWordBase;

        for (const wordBase of wb) {
            if (wordBase.id === selectID) {
                return setNowSelectData(wordBase);
            }
        }
        setNowSelectData(null);
    }, [userWordBase]);

    const handleOnOK = React.useCallback(async () => {
        const { wordBase } = _form.getFieldsValue(['wordBase']);

        if (!wordBase) {
            message.error(t('未选择词库'));
            return;
        }

        try {
            setLoading(true);
            await props.onOk(wordBase, nowSelectData);
            setTimeout(props.onCancel);
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    }, [props.onOk, nowSelectData]);

    const loadData = React.useCallback(async () => {
        if (!userStore.user.userID) {
            message.error(t('用户未登录'));
            return;
        }
        if (Array.isArray(props.data)) {
            setUserWordBase(props.data);
            if (!!props.data.length) {
                _form.setFields([{ name: 'wordBase', value: props.data[0].id }]);
                handleOnSelect(props.data[0].id, props.data);
            }
            return;
        }
        setLoading(true);

        try {
            const data = await WordBaseAPI.getWordBaseByUserID({ userID: userStore.user.userID });
            setUserWordBase(data);
            if (!!data.length) {
                _form.setFields([{ name: 'wordBase', value: data[0].id }]);
                handleOnSelect(data[0].id, data);
            }
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
            message.error(t('获取用户词库错误'));
        } finally {
            setLoading(false);
        }
    }, [userStore.user, props.data]);

    React.useEffect(() => {
        if (!props.visible) {
            setUserWordBase([]);
            return;
        }
        loadData();
    }, [props.visible, loadData]);

    const renderContent = React.useMemo(() => {
        const defaultContent = (
            <React.Fragment>
                <Typography.Title
                    className={'select-word-base-model-label'}
                    level={4}
                >
                    {props.label || t('请选择词库')}
                </Typography.Title>
                <Form name={'selectWordBase'} form={_form}>
                    <Form.Item name={'wordBase'} noStyle>
                        <Select className={'select-word-base-model-select'} placeholder={t('请选择词库')} onSelect={(id: number) => handleOnSelect(id, userWordBase)}>
                            {userWordBase.map(item => (
                                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );

        if (typeof props.renderContent === 'function') {
            return props.renderContent(defaultContent, nowSelectData);
        }

        return defaultContent;
    }, [props.renderContent, userWordBase, nowSelectData]);

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

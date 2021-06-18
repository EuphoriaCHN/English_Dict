import React from 'react';
import { useTranslation } from 'react-i18next';
import { WordBaseAPI } from '@/api';

import { useSelector } from 'react-redux';
import { Store } from '@/store';

import { Modal, Spin, Select, Form, message, Typography } from 'antd';

import './index.scss';

export interface ISelectWordBaseModelProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (wordBaseID: number) => Promise<unknown>;

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
}

function SelectWordBaseModel(props: ISelectWordBaseModelProps) {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [userWordBase, setUserWordBase] = React.useState<WordBase[]>([]);

    const { t } = useTranslation();
    const [_form] = Form.useForm();

    const userStore = useSelector<Store, Store['user']>(state => state.user);

    const handleOnOK = React.useCallback(async () => {
        const { wordBase } = _form.getFieldsValue(['wordBase']);

        if (!wordBase) {
            message.error(t('未选择词库'));
            return;
        }

        try {
            setLoading(true);
            await props.onOk(wordBase);
            setTimeout(props.onCancel);
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
        } finally {
            setLoading(false);
        }
    }, [props.onOk]);

    const loadData = React.useCallback(async () => {
        if (!userStore.user.userID) {
            message.error(t('用户未登录'));
            return;
        }
        setLoading(true);

        try {
            const data = await WordBaseAPI.getWordBaseByUserID({ userID: userStore.user.userID });
            setUserWordBase(data);
            !!data.length && _form.setFields([{ name: 'wordBase', value: data[0].id }]);
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
            message.error(t('获取用户词库错误'));
        } finally {
            setLoading(false);
        }
    }, [userStore.user]);

    React.useEffect(() => {
        if (!props.visible) {
            setUserWordBase([]);
            return;
        }
        loadData();
    }, [props.visible, loadData]);

    return (
        <Modal
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={handleOnOK}
            title={t('选择词库')}
            okText={props.okText || t('添加')}
            cancelText={props.cancelText || t('取消')}
            okButtonProps={{ loading }}
            cancelButtonProps={{ disabled: loading }}
            className={'select-word-base-model'}
        >
            <Spin spinning={loading}>
                <Typography.Title
                    className={'select-word-base-model-label'}
                    level={4}
                >
                    {props.label || t('请选择词库')}
                </Typography.Title>
                <Form name={'selectWordBase'} form={_form}>
                    <Form.Item name={'wordBase'} noStyle>
                        <Select className={'select-word-base-model-select'} placeholder={t('请选择词库')}>
                            {userWordBase.map(item => (
                                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}

export default SelectWordBaseModel;

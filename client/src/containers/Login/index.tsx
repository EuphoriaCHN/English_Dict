import React from 'react';
import { useTranslation } from 'react-i18next';

import LanguageSelector from '@/components/LanguageSelector';
import { Typography, Form, Input, Button, message } from 'antd';

import WeChatIcon from '@/common/images/Wechat';
import { AlipayOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';

import './index.scss';

function Login() {
    const { t } = useTranslation();
    const [_form] = Form.useForm();

    // todo
    const unready = React.useCallback(() => {
        message.warning(t('功能开发中...'));
    }, []);

    const moreLoginButtonGroups = React.useMemo(() => [{
        label: t('微信扫码登录'),
        icon: <WeChatIcon />,
        color: 'rgb(9, 187, 7)',
        onClick: unready
    }, {
        label: t('支付宝扫码登录'),
        icon: <AlipayOutlined />,
        color: 'rgb(6, 180, 253)',
        onClick: unready
    }, {
        label: t('Github 授权登录'),
        icon: <GithubOutlined />,
        color: 'rgb(102, 102, 102)',
        onClick: unready
    }, {
        label: t('Google 授权登录'),
        icon: <GoogleOutlined />,
        color: 'rgb(221, 75, 57)',
        onClick: unready
    }], []);

    return (
        <div className={'login'}>
            <div className={'login-header'}>
                <LanguageSelector />
            </div>
            <div className={'login-box'}>
                <div className={'login-box-form'}>
                    <Typography.Title className={'login-title'} level={2}>{t('登录')}</Typography.Title>
                    <Form
                        form={_form}
                        labelCol={{ span: 6 }}
                        name={'loginForm'}
                    >
                        <Form.Item label={t('用户名')}>
                            <Input placeholder={t('请输入用户名')} allowClear />
                        </Form.Item>
                        <Form.Item label={t('密码')}>
                            <Input.Password placeholder={t('请输入密码')} allowClear />
                        </Form.Item>
                        <Button className={'login-submit-btn'} type={'primary'} block>{t('现在登录')}</Button>
                    </Form>
                </div>
                <div className={'login-box-more'}>
                    {moreLoginButtonGroups.map(({ label, icon, color, onClick }, index) => (
                        <div onClick={onClick} style={{ backgroundColor: color }} className={'login-box-more-button'} key={index}>
                            <span className={'btn-icon'}>{icon}</span>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Login

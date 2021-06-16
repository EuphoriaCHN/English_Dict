import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'umi';
import { UserAPI } from '@/api';

import LanguageSelector from '@/components/LanguageSelector';
import { Typography, Form, Input, Button, message, Spin } from 'antd';

import WeChatIcon from '@/common/images/Wechat';
import { AlipayOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';

import './index.scss';
import Cookies from 'js-cookie';

function Login() {
    const [loading, setLoading] = React.useState<boolean>(false);

    const { t } = useTranslation();
    const [_form] = Form.useForm();
    const _history = useHistory();

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

    const handleSubmit = React.useCallback(async () => {
        const { account, password } = _form.getFieldsValue(['account', 'password']);

        const accountErrMsg: string[] = [];
        const passwordErrMsg: string[] = [];

        if (!account) {
            accountErrMsg.push(t('此项是必填项'));
        } else if (account.length < 6 || account.length > 16) {
            accountErrMsg.push(t('用户名长度在 6 到 16 个字符之间'));
        }

        if (!password) {
            passwordErrMsg.push(t('此项是必填项'));
        } else if (password.length < 6 || password.length > 16) {
            passwordErrMsg.push(t('密码长度在 6 到 16 个字符之间'));
        }

        _form.setFields([{ name: 'account', errors: accountErrMsg }]);
        _form.setFields([{ name: 'password', errors: passwordErrMsg }]);

        if (!!accountErrMsg.length || !!passwordErrMsg.length) {
            return;
        }

        setLoading(true);

        try {
            const { token } = await UserAPI.accountLogin({ account, password });
            Cookies.set(AUTHORIZATION_KEY, token, { expires: 1 });
            message.success(t('登录成功'));
            _history.replace('/');
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
            message.error(t('登录失败'));
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className={'login'}>
            <div className={'login-header'}>
                <LanguageSelector />
            </div>
            <Spin spinning={loading}>
                <div className={'login-box'}>
                    <div className={'login-box-form'}>
                        <Typography.Title className={'login-title'} level={2}>{t('登录')}</Typography.Title>
                        <Form
                            form={_form}
                            labelCol={{ span: 6 }}
                            name={'loginForm'}
                        >
                            <Form.Item name={'account'} label={t('用户名')}>
                                <Input maxLength={16} placeholder={t('请输入用户名')} allowClear />
                            </Form.Item>
                            <Form.Item name={'password'} label={t('密码')}>
                                <Input.Password maxLength={16} placeholder={t('请输入密码')} allowClear />
                            </Form.Item>
                            <Button onClick={handleSubmit} className={'login-submit-btn'} type={'primary'} block>{t('现在登录')}</Button>
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
            </Spin>
        </div>
    );
}

export default Login

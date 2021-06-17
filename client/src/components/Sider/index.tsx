import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import { Layout, Menu, Typography } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';

import EuphoriaLogo from '@/common/images/Euphoria.png';

import './index.scss';

interface SiderMenuItem {
    title: string;
    icon: JSX.Element;
    key: string;
    children?: Omit<SiderMenuItem, 'icon' | 'children'>[];
}

function Sider(this: any) {
    const [collapsed, setCollapsed] = React.useState<boolean>(false);
    const { t } = useTranslation();

    const menuItem = React.useMemo<SiderMenuItem[]>(() => [{
        title: t('在线翻译'),
        key: 'translate',
        icon: <TranslationOutlined />
    }], []);

    return (
        <Layout.Sider collapsed={collapsed} onCollapse={setCollapsed.bind(this, !collapsed)} collapsible>
            <div className={classnames('sider-logo', { 'sider-logo-collapsed': collapsed })}>
                <img src={EuphoriaLogo} alt={'Logo'} className={'sider-logo-img'} />
                <Typography.Title level={2} className={'sider-logo-text'}>Euphoria</Typography.Title>
            </div>
            <Menu theme={'dark'} defaultSelectedKeys={['1']} mode={'inline'}>
                {menuItem.map(item => {
                    if (Array.isArray(item.children)) {
                        return (
                            <Menu.SubMenu key={item.key} icon={item.icon} title={item.title}>
                                {item.children.map(child => (
                                    <Menu.Item key={child.key}>{child.title}</Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        )
                    }
                    return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>;
                })}
            </Menu>
        </Layout.Sider>
    );
}

export default Sider;

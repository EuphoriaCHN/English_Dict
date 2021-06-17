import React from 'react';
import { useTranslation } from 'react-i18next';

import { Layout, Menu, Typography } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';

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
            <Typography.Title>{t('Hello')}</Typography.Title>
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

import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { useHistory, useLocation } from 'umi';
import { useWindowResize } from '@/common/utils';

import { Layout, Menu, Typography } from 'antd';
import { TranslationOutlined, DatabaseOutlined, ScheduleOutlined } from '@ant-design/icons';

import EuphoriaLogo from '@/common/images/Euphoria.png';

import { SelectEventHandler } from 'rc-menu/lib/interface';

import './index.scss';

interface SiderMenuItem {
    title: string;
    icon: JSX.Element;
    key: string;
    children?: Omit<SiderMenuItem, 'icon' | 'children'>[];
}

function Sider(this: any) {
    const [collapsible, setCollapsible] = React.useState<boolean>(true);
    const [collapsed, setCollapsed] = React.useState<boolean>(false);
    const [selectKey, setSelectKey] = React.useState<string>('');

    const { t } = useTranslation();
    const _location = useLocation();
    const _history = useHistory();

    const handleOnMenuSelect = React.useCallback<SelectEventHandler>(({ key }) => {
        setSelectKey(key);
        _history.push(`/${key}`);
    }, []);

    const menuItem = React.useMemo<SiderMenuItem[]>(() => [{
        title: t('在线翻译'),
        key: 'translate',
        icon: <TranslationOutlined />
    }, {
        title: t('我的词库'),
        key: 'wordBase',
        icon: <DatabaseOutlined />
    }, {
        title: t('背单词'),
        key: 'recite',
        icon: <ScheduleOutlined />
    }], []);

    const handleOnWindowResize = React.useCallback(() => {
        // 移动端默认收起 sider，不允许扩张 sider
        if (document.documentElement.clientWidth < 768) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
        setCollapsible(document.documentElement.clientWidth >= 768);
    }, []);

    useWindowResize(handleOnWindowResize, 200);

    React.useEffect(() => {
        if (_location.pathname === '/') {
            _history.replace('/translate');
            return;
        }

        setSelectKey(_location.pathname.split(/\//)[1]);
        handleOnWindowResize();
    }, []);

    return (
        <Layout.Sider collapsed={collapsed} onCollapse={setCollapsed.bind(this, !collapsed)} collapsible={collapsible}>
            <div className={classnames('sider-logo', { 'sider-logo-collapsed': collapsed })}>
                <img src={EuphoriaLogo} alt={'Logo'} className={'sider-logo-img'} />
                <Typography.Title level={2} className={'sider-logo-text'}>Euphoria</Typography.Title>
            </div>
            <Menu onSelect={handleOnMenuSelect} theme={'dark'} selectedKeys={[selectKey]} mode={'inline'}>
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

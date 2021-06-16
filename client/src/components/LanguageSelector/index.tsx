import React from 'react';
import { useTranslation } from 'react-i18next';
import Cookie from 'js-cookie';

import { Dropdown, Menu, Button } from 'antd';

import { DownOutlined } from '@ant-design/icons';

import { ButtonType } from 'antd/lib/button/button';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';

interface IProps {
    buttonType?: ButtonType;
}

function LanguageSelector(props: IProps) {
    const { i18n } = useTranslation();

    const languages: { [k: string]: string } = React.useMemo(() => ({
        'zh-cn': '简体中文',
        'en-us': 'English'
    }), []);

    const handleOnClick = React.useCallback<MenuClickEventHandler>(({ key }) => {
        if (key === i18n.language) {
            return;
        }
        Cookie.set(I18N_COOKIE_KEY, key, { expires: 365 });
        location.reload();
    }, [])

    const render = React.useMemo(() => (
        <Dropdown
            trigger={['click']}
            overlay={(
                <Menu selectedKeys={[i18n.language]} onClick={handleOnClick}>
                    {Object.keys(languages).map(lang => (
                        <Menu.Item key={lang}>{languages[lang]}</Menu.Item>
                    ))}
                </Menu>
            )}
        >
            <Button type={props.buttonType || 'ghost'} icon={<DownOutlined />}>
                {languages[i18n.language]}
            </Button>
        </Dropdown>
    ), []);

    return render;
}

export default LanguageSelector

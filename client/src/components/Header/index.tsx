import React from 'react';

import { Layout } from 'antd';

import LanguageSelector from '@/components/LanguageSelector';

import './index.scss';

function Header() {
    return (
        <Layout.Header className={'header'}>
            <LanguageSelector />
        </Layout.Header>
    )
}

export default Header;

import React from 'react';
import { useLocation } from 'umi';

import { Layout } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sider from '@/components/Sider';

import LoginWrapper from '@/components/LoginWrapper';

import './index.scss';

function LayoutWrapper(props: React.PropsWithChildren<{}>) {
    const _location = useLocation();

    const renderContent = React.useMemo(() => {
        if (/\/login/.test(_location.pathname)) {
            return props.children;
        }

        const AuthContent = LoginWrapper(Header);

        return (
            <Layout className={'site-layout'}>
                <Sider />
                <Layout>
                    <AuthContent />
                    <div className={'site-layout-container'}>
                        {props.children}
                    </div>
                    <Footer />
                </Layout>
            </Layout>
        );
    }, [props.children]);

    return renderContent;
}

export default LayoutWrapper;

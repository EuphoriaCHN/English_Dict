import React from 'react';

import { Layout } from 'antd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sider from '@/components/Sider';

import LoginWrapper from '@/components/LoginWrapper';

import './index.scss';

function LayoutWrapper(props: React.PropsWithChildren<{}>) {
    const renderContent = React.useMemo(() => {
        const AuthContent = LoginWrapper(function (_: {}) {
            return <div className={'container'}>{props.children}</div>;
        });

        return (
            <Layout className={'site-layout'}>
                <Sider />
                <Layout>
                    <Header />
                    <AuthContent />
                    <Footer />
                </Layout>
            </Layout>
        );
    }, [props.children]);

    return renderContent;
}

export default LayoutWrapper;

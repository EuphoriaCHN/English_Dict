import React from 'react';

import LoginWrapper from '@/components/LoginWrapper';

function Layout(props: React.PropsWithChildren<{}>) {
    const renderContent = React.useMemo(() => {
        const AuthContent = LoginWrapper(function (_: {}) {
            return <React.Fragment>{props.children}</React.Fragment>;
        });

        return (
            <AuthContent />
        );
    }, [props.children]);

    return renderContent;
}

export default Layout;

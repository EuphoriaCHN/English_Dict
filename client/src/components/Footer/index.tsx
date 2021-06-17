import React from 'react';

import { Layout, Typography } from 'antd';
import BeiAnLogo from '@/common/images/BeiAn.png';

import './index.scss';

function Footer() {
    const startYear = React.useMemo<number>(() => 2021, []);
    const nowYear = new Date().getFullYear();

    const render = React.useMemo(() => (
        <Layout.Footer className={'footer'}>
            <div>
                <Typography.Text>Euphoria Daily English</Typography.Text>
                <Typography.Text>&copy; {nowYear === startYear ? startYear : `${startYear} ~ ${nowYear}`} </Typography.Text>
                <Typography.Text>Wang Qinhong</Typography.Text>
            </div>
            <div className={'footer-beian'}>
                <img src={BeiAnLogo} />
                <a target={'__blank'} href={'http://www.beian.miit.gov.cn/'}>陕ICP备 2021006075号-1</a>
            </div>
        </Layout.Footer>
    ), []);

    return render;
}

export default Footer;

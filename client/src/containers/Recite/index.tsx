import React from 'react';
import { useTranslation } from 'react-i18next';

import {} from 'antd';

import './index.scss';

function Recite() {
    const { t } = useTranslation();

    return (
        <div className={'container recite'}>
            <h1>Recite</h1>
        </div>
    );
}

export default Recite

import React from 'react';
import { useTranslation } from 'react-i18next';

import {} from 'antd';

import './index.scss';

function WordBase() {
    const { t } = useTranslation();

    return <h1>WordBase</h1>;
}

export default WordBase

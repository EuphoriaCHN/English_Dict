import React from 'react';
import { useTranslation } from 'react-i18next';

import WordBaseSelector from '@/components/WordBaseSelector';
import {} from 'antd';

import './index.scss';

function Recite() {
    const { t } = useTranslation();

    return (
        <div className={'container recite'}>
            <header className={'recite-header'}>
                <WordBaseSelector />
            </header>
            <div className={'recite-modes'}>

            </div>
        </div>
    );
}

export default Recite;
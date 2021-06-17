import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowResize } from '@/common/utils';

import { Input, Select, Tooltip } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

import './index.scss';

function Translate() {
    const [textAreaRows, setTextAreaRows] = React.useState<number>(5);
    const { t } = useTranslation();

    useWindowResize(function () {
        if (document.documentElement.clientWidth < 768) {
            return setTextAreaRows(2);
        }
        setTextAreaRows(5);
    });

    return (
        <div className={'container'}>
            <div className={'translate'}>
                <div className={'translate-header'}>
                    <Tooltip title={t('目前源语言只支持英语')}>
                        <Select className={'translate-header-selection'} defaultValue={'en-US'} disabled>
                            <Select.Option value={'en-US'}>English</Select.Option>
                        </Select>
                    </Tooltip>
                    <SwapOutlined />
                    <Tooltip title={t('目前目标语言只支持简体中文')}>
                        <Select className={'translate-header-selection'} defaultValue={'zh-CN'} disabled>
                            <Select.Option value={'zh-CN'}>简体中文</Select.Option>
                        </Select>
                    </Tooltip>
                </div>
                <div className={'translate-box'}>
                    <Input.TextArea autoSize={false} rows={textAreaRows} allowClear />
                    <div style={{ height: textAreaRows * 40 + 24 }} className={'translate-result'}></div>
                </div>
            </div>
        </div>
    );
}

export default Translate;

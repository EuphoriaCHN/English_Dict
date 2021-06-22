import React from 'react';
import { useTranslation } from 'react-i18next';
import { WordBaseAPI } from '@/api';

import { Store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { setWordBases } from '@/store/WordBaseStore';

import { Select, message } from 'antd';

export interface IWordBaseSelectorProps<T extends {id: number; name: string}> {
    onSelect?: (wordBaseID: number, wordBase: WordBase) => void;
    data?: T[];    
}

function WordBaseSelector(props: IWordBaseSelectorProps<WordBase>) {
    const [selectedWordBaseID, setSelectWordBaseID] = React.useState<number>();
    const [loading, setLoading] = React.useState<boolean>(false);

    const { t } = useTranslation();
    const _dispatch = useDispatch();

    const wordBaseStore = useSelector<Store, Store['wordBase']>(state => state.wordBase);

    const loadData = React.useCallback(async () => {
        try {
            let wordBases = wordBaseStore.wordBases;

            if (!wordBases.length) {
                wordBases = await WordBaseAPI.getUserWordBases();
                _dispatch(setWordBases({
                    id: nanoid(),
                    wordBases
                }));
            }

            if (!!wordBases.length) {
                const initialValues = wordBases[0];
                onSelect(initialValues.id);
                setTimeout(() => setSelectWordBaseID(initialValues.id));
            } else {
                message.warning(t('当前用户没有词库'));
            }
        } catch (err) {
            message.error(err.message || JSON.stringify(err));
            message.error(t('获取用户词库列表失败'));
        } finally {
            setLoading(false);
        }
    }, []);

    const onSelect = React.useCallback(async (id: number, option = {}) => {
        if (selectedWordBaseID === id) {
            return;
        }
        setSelectWordBaseID(id);
        typeof props.onSelect === 'function' && props.onSelect(id, option.wb);
    }, [props.onSelect, selectedWordBaseID]);

    React.useEffect(() => {
        loadData();
    }, []);

    return (
        <Select 
            loading={loading} 
            value={selectedWordBaseID}
            onSelect={onSelect}
        >
            {(props.data || wordBaseStore.wordBases).map(item => (
                <Select.Option value={item.id} key={item.id} wb={item}>{item.name}</Select.Option>
            ))}
        </Select>
    );
}

export default WordBaseSelector;

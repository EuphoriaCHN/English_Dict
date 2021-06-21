import I18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { initI18nextInstance } from './i18n';
import moment from 'moment';

import { Provider as ReduxProvider } from 'react-redux';
import store from '@/store';

import '@/common/styles/base.scss';

export function rootContainer(LastRootContainer: any) {
    return (
        <I18nextProvider i18n={I18n}>
            <ReduxProvider store={store}>
                {LastRootContainer}
            </ReduxProvider>
        </I18nextProvider>
    );
}

export function render(oldRender: any) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    window.moment = moment;

    initI18nextInstance().then(() => {
        moment.locale(I18n.language.toLowerCase());
        
        oldRender();
    });
}
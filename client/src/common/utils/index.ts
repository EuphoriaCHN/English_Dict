import React from 'react';
import copy from 'copy-to-clipboard';

import debounce from 'lodash-es/debounce';
import noop from 'lodash-es/noop';

import { message } from 'antd';

/**
 * window resize hook
 */
export function useWindowResize(callback: (ev: UIEvent) => void) {
    const ref = React.useRef(callback);

    React.useEffect(() => {
        window.addEventListener('resize', ref.current);

        return () => {
            window.removeEventListener('resize', ref.current);
        };
    }, []);
}

/**
 * 处理音频播放
 */
export function handleSoundVoiceOnMouseEnter(soundURL: string, el: HTMLAudioElement | null) {
    if (!el) {
        return noop;
    }

    return debounce<React.MouseEventHandler<any>>(async function () {
        el.src = soundURL;
        el.loop = false;
        el.play();
    }, 500);
}

/**
 * 处理复制文本 React Event
 */
export function handleCopyText(text: string, callback?: Function) {
    return function() {
        copy(text);
        typeof callback === 'function' && callback(text);
    }
}
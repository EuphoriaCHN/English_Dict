import React from 'react';
import copy from 'copy-to-clipboard';

import debounce from 'lodash-es/debounce';
import noop from 'lodash-es/noop';

/**
 * window resize hook
 */
export function useWindowResize(callback: (ev: UIEvent) => void, debounceTime?: number, immediately?: boolean) {
    const ref = React.useRef(!!debounceTime ? debounce(callback, debounceTime) : callback);

    React.useEffect(() => {
        window.addEventListener('resize', ref.current);

        return () => {
            window.removeEventListener('resize', ref.current);
        };
    }, [ref.current]);
}

/**
 * 处理音频播放
 */
export function handleSoundVoiceOnMouseEnter(soundURL: string, el: HTMLAudioElement | null) {
    if (!el) {
        return noop;
    }

    const cb = React.useCallback(debounce<React.MouseEventHandler<any>>(async function () {
        el.src = soundURL;
        el.loop = false;
        el.play();
    }, 500), [el, soundURL]);

    return cb;
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

/**
 * 计算 offset & limit
 */
export function getPaginationData(currentPage: number, pageSize: number) {
    return {
        limit: pageSize,
        offset: pageSize * (currentPage - 1)
    };
}

/**
 * Safe JSON.parse
 */
export function safeParse<T extends Dict = Dict>(jsonString: string, onError: Function = noop, fallback: T = {} as T): T {
    try {
        const data = JSON.parse(jsonString);
        return data;
    } catch(err) {
        typeof onError === 'function' && onError(err);
        return fallback || {};
    }
}

/**
 * 全站 Format Time
 */
export function formatTime(timeString: moment.MomentInput) {
    return window.moment(timeString).fromNow();
}
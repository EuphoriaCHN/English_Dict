import React from 'react';

import debounce from 'lodash-es/debounce';
import noop from 'lodash-es/noop';

export function useWindowResize(callback: (ev: UIEvent) => void) {
    const ref = React.useRef(callback);

    React.useEffect(() => {
        window.addEventListener('resize', ref.current);

        return () => {
            window.removeEventListener('resize', ref.current);
        };
    }, []);
}

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

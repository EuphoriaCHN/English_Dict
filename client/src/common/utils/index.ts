import React from 'react';

export function useWindowResize(callback: (ev: UIEvent) => void) {
    const ref = React.useRef(callback);

    React.useEffect(() => {
        window.addEventListener('resize', ref.current);

        return () => {
            window.removeEventListener('resize', ref.current);
        };
    }, []);
}
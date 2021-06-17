import React from 'react';

import './index.scss';

function Loading() {
    const render = React.useMemo(() => (
        <div className={'loading'}>
            <div className={'loading-cat'}>
                <div className={'loading-cat-body'} />
                <div className={'loading-cat-body'} />
                <div className={'loading-cat-tail'} />
                <div className={'loading-cat-head'} />
            </div>
        </div>
    ), []);

    return render;
}

export default Loading;

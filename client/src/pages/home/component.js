import React from 'react';

import { useClassName } from 'utils/cn';
import './style.less';

export default () => {
    const cn = useClassName('home-page');

    return (
        <div className={cn()}>
            123
        </div>
    );
};

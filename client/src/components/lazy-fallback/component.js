import * as React from 'react';
import { Spin } from 'antd';
import { useClassName } from 'utils/cn';

import './style.less';

export default () => {
    const cn = useClassName('lazy-fallback');

    return (
        <div className={cn()}>
            <Spin size="large" tip="Loading" />
        </div>
    );
};

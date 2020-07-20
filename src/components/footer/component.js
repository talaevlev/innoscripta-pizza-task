import React from 'react';
import { Layout } from 'antd';

import { useClassName } from 'utils/cn';

import './style.less';

const { Footer } = Layout;

export default () => {
    const cn = useClassName('footer');

    return (
        <Footer className={cn()}>
            ftalaev ©2020
        </Footer>
    );
};

import React from 'react';
import { Layout } from 'antd';

import { useClassName } from 'utils/cn';

import './style.less';

const { Content } = Layout;

export default ({ className: propClassName, ...rest }) => {
    const cn = useClassName('content');
    const className = `${cn()} ${propClassName ?? ''}`;

    return (
        <Content className={className} {...rest} />
    );
};

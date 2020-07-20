import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import { useClassName } from 'utils/cn';

import './style.less';

const { Content } = Layout;

const ContentComponent = ({ className: propClassName, ...rest }) => {
    const cn = useClassName('content');
    const className = `${cn()} ${propClassName ?? ''}`;

    return (
        <Content className={className} {...rest} />
    );
};

ContentComponent.propTypes = {
    className: PropTypes.string
};

ContentComponent.defaultProps = {
    className: ''
};

export default ContentComponent;

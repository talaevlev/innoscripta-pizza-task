import React from 'react';
import { Layout, Button, Icon } from 'antd';
import { useHistory } from 'react-router';

import { useClassName } from 'utils/cn';

import './style.less';

const { Header } = Layout;

export default ({ total }) => {
    const cn = useClassName('header');
    const history = useHistory();

    const onClickLogo = () => {
        history.push('/home');
    };

    return (
        <Header className={cn()}>
            <div className={cn('logo')} onClick={onClickLogo}>
                Pizza la Fedya
            </div>
            <div className={cn('right-side')}>
                <div className={cn('total')}>
                    <div className={cn('total', 'euro')}>
                        {total.euro.toFixed(2)} Euro
                    </div>
                    <div className={cn('total', 'usd')}>
                        {total.usd.toFixed(2)} USD
                    </div>
                    <Icon type="shopping-cart" />
                </div>
                <div className={cn('auth')}>
                    <Button type="primary" size="large">Login</Button>
                </div>
            </div>
        </Header>
    );
};

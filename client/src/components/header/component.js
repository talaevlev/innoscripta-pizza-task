import React, { useContext, useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

import { LoginModal } from 'components';
import { userStore, setUserAction, unsetUserAction } from 'models/user/context';
import { getStorageUser, setStorageUser } from 'models/user/api';
import { useClassName } from 'utils/cn';

import './style.less';

const { Header } = Layout;

export default ({ total }) => {
    const cn = useClassName('header');
    const [loginVisible, setLoginVisible] = useState(false);
    const history = useHistory();
    const { state, dispatch } = useContext(userStore);

    useEffect(() => {
        const { isAuth, email } = getStorageUser();
        if (isAuth) dispatch(setUserAction(email));
    }, []);

    const openLoginModal = () => { setLoginVisible(true); };

    const closeLoginModal = () => { setLoginVisible(false); };

    const onLogout = () => {
        setStorageUser(false);
        dispatch(unsetUserAction());
    };

    const onClickLogo = () => {
        history.push('/home');
    };

    const onClickAuthBtn = () => {
        if (state?.isAuth) onLogout();
        else openLoginModal();
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
                    <Button className={cn('total', 'cart')}
                        icon={<ShoppingCartOutlined className={cn('total', 'cart-icon')} />}
                        type="primary"
                        size="large"
                        disabled={!total.euro}
                        ghost>
                        Buy
                    </Button>
                </div>
                <div className={cn('auth')}>
                    {state?.isAuth && (
                        <div className={cn('auth', 'user')}>
                            <UserOutlined />
                            <div className={cn('auth', 'user', 'email')}>{state.email}</div>
                        </div>
                    )}
                    <Button type="primary" size="large" onClick={onClickAuthBtn}>
                        {state?.isAuth ? 'Logout' : 'Login'}
                    </Button>
                </div>
            </div>
            <LoginModal visible={loginVisible} onCancel={closeLoginModal} />
        </Header>
    );
};

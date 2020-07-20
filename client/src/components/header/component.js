import React, { useContext, useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

import {
    LoginModal, CartContent, DeliveryInfo, DeliveryHistory
} from 'components';
import { cartItemsStore } from 'models/cart/context';
import { userStore, setUserAction, unsetUserAction } from 'models/user/context';
import { getStorageUser, setStorageUser } from 'models/user/api';
import { useClassName } from 'utils/cn';

import './style.less';

const { Header } = Layout;

export default () => {
    const cn = useClassName('header');
    const [loginVisible, setLoginVisible] = useState(false);
    const [cartVisible, setCartVisible] = useState(false);
    const [deliveryVisible, setDeliveryVisible] = useState(false);
    const [historyVisible, setHistoryVisible] = useState(false);
    const history = useHistory();
    const { state, dispatch } = useContext(userStore);
    const { state: { total } } = useContext(cartItemsStore);

    useEffect(() => {
        const { isAuth, email } = getStorageUser();
        if (isAuth) dispatch(setUserAction(email));
    }, []);

    const openLoginModal = () => { setLoginVisible(true); };

    const closeLoginModal = () => { setLoginVisible(false); };

    const openCartModal = () => { setCartVisible(true); };

    const closeCartModal = () => { setCartVisible(false); };

    const openDeliveryModal = () => { setDeliveryVisible(true); };

    const closeDeliverModal = () => { setDeliveryVisible(false); };

    const openHistoryModal = () => { setHistoryVisible(true); };

    const closeHistoryModal = () => { setHistoryVisible(false); };

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
                        onClick={openCartModal}
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
                        <div className={cn('auth', 'user')} onClick={openHistoryModal}>
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
            <CartContent visible={cartVisible}
                openDeliveryModal={openDeliveryModal}
                onCancel={closeCartModal} />
            <DeliveryInfo visible={deliveryVisible} onCancel={closeDeliverModal} />
            <DeliveryHistory visible={historyVisible} onCancel={closeHistoryModal} />
        </Header>
    );
};

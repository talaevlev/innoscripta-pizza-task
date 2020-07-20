import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enUs from 'antd/es/locale/en_US';

import { UserProvider } from 'models/user/context';
import { PizzasProvider } from 'models/pizzas/context';
import { CartItemsProvider } from 'models/cart/context';

import routes from './routes';
import './style/style.less';

const history = createBrowserHistory();

ReactDOM.render(
    <ConfigProvider locale={enUs}>
        <Router history={history}>
            <UserProvider>
                <PizzasProvider>
                    <CartItemsProvider>
                        { routes }
                    </CartItemsProvider>
                </PizzasProvider>
            </UserProvider>
        </Router>
    </ConfigProvider>,
    document.getElementById('root')
);

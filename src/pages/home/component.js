import React, { useEffect, useContext } from 'react';
import { Layout } from 'antd';

import {
    Header, Footer, Content, PizzasWrap
} from 'components';
import { pizzasStore, setPizzasAction } from 'models/pizzas/context';
import { getPizzas } from 'models/pizzas/api';
import { useClassName } from 'utils/cn';

import './style.less';

export default () => {
    const cn = useClassName('home-page');
    const { dispatch: dispatchPizzas } = useContext(pizzasStore);

    useEffect(() => {
        dispatchPizzas(setPizzasAction(getPizzas()));
    }, []);

    return (
        <Layout className={cn()}>
            <Header />
            <Content>
                <PizzasWrap />
            </Content>
            <Footer />
        </Layout>
    );
};

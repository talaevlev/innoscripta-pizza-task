import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

import { Header, Footer, Content } from 'components';
import { useClassName } from 'utils/cn';
import { getPizzas } from 'models/pizzas/api';

import PageContent from './components/content';
import './style.less';

export default () => {
    const cn = useClassName('home-page');
    const [pizzas, setPizzas] = useState([]);
    const [pizzaPrices, setPizzaPrices] = useState({});
    const [items, changeItem] = useState({});
    const [total, setTotal] = useState({ euro: 0, usd: 0 });

    useEffect(() => {
        getPizzasCall();
    }, []);

    useEffect(() => {
        setTotal(Object.keys(items).reduce((acc, key) => ({
            euro: acc.euro + pizzaPrices[key].euro * items[key],
            usd: acc.usd + pizzaPrices[key].usd * items[key]
        }), { euro: 0, usd: 0 }));
    }, [items]);

    const getPizzasCall = async () => {
        const pizzas = await getPizzas();
        setPizzas(pizzas);
        setPizzaPrices(pizzas.reduce((acc, { id, price }) => ({ ...acc, [id]: price }), {}));
    };

    const onChangeItem = (itemId, value) => {
        changeItem({ ...items, [itemId]: value });
    };

    return (
        <Layout className={cn()}>
            <Header total={total} />
            <Content>
                <PageContent pizzas={pizzas} onChangeItem={onChangeItem} />
            </Content>
            <Footer />
        </Layout>
    );
};

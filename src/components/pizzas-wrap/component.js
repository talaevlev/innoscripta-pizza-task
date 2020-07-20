import React, { useState, useContext, useMemo } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

import { pizzasStore } from 'models/pizzas/context';
import { cartItemsStore, setCartItemAction } from 'models/cart/context';
import { PizzaElement } from 'components';
import { useClassName } from 'utils/cn';

import './style.less';

const { Option } = Select;

const PizzasWrap = ({ selectedPizzas, type }) => {
    const cn = useClassName('home-content');
    const [currency, setCurrent] = useState('euro');
    const { state: { pizzas: statePizzas, pizzaPrices } } = useContext(pizzasStore);
    const { state: { items }, dispatch: dispatchCartItems } = useContext(cartItemsStore);

    const onChangeItem = (itemId, value) => {
        dispatchCartItems(setCartItemAction(itemId, value, pizzaPrices));
    };

    const pizzas = useMemo(() => {
        if (selectedPizzas) {
            return statePizzas.filter(({ id }) => (Object.keys(selectedPizzas).includes(id)));
        } else return statePizzas;
    }, [selectedPizzas, statePizzas]);

    const getPizzaAmount = (pizzaId) => {
        if (items && Object.keys(items).includes(pizzaId)) {
            return items[pizzaId];
        }

        return 0;
    };

    return (
        <div className={cn({ [type]: !!type })}>
            <div className={cn('select-price')}>
                <div className={cn('select-price', 'label')}>Select price label:</div>
                <Select onSelect={setCurrent} value={currency}>
                    <Option key="euro" value="euro">Euro</Option>
                    <Option key="usd" value="usd">USD</Option>
                </Select>
            </div>
            <div className={cn('pizzas')}>
                {pizzas?.map(pizza => (
                    <PizzaElement key={pizza.id}
                        type={type}
                        amount={getPizzaAmount(pizza.id)}
                        pizza={pizza}
                        onChangeItem={onChangeItem}
                        currency={currency} />
                ))}
            </div>
        </div>
    );
};

PizzasWrap.propTypes = {
    selectedPizzas: PropTypes.object,
    type: PropTypes.string
};

PizzasWrap.defaultProps = {
    selectedPizzas: undefined,
    type: undefined
};

export default PizzasWrap;

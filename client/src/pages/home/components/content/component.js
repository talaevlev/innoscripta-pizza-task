import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

import { useClassName } from 'utils/cn';

import PizzaElement from '../pizza-element';
import './style.less';

const { Option } = Select;

export default ({ pizzas, onChangeItem }) => {
    const cn = useClassName('home-content');
    const [currency, setCurrent] = useState('euro');

    return (
        <div className={cn()}>
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
                        pizza={pizza}
                        onChangeItem={onChangeItem}
                        currency={currency} />
                ))}
            </div>
        </div>
    );
};

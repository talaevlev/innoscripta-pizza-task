import React from 'react';
import { Card, InputNumber } from 'antd';

import { useClassName } from 'utils/cn';

import './style.less';

const { Meta } = Card;

export default ({ pizza, currency, onChangeItem }) => {
    const cn = useClassName('pizza-element');
    const {
        title, description, id, price
    } = pizza;

    const getPrice = () => {
        const { euro, usd } = price;
        switch (currency) {
            case 'usd': return `${usd} USD`;
            case 'euro':
            default: return `${euro} Euro`;
        }
    };

    const onChangeAmount = (value) => {
        onChangeItem(id, value);
    };

    return (
        <Card hoverable
            className={cn()}
            cover={<img alt={title} src={`/images/${id}.png`} />}>
            <Meta title={title} description={description} />
            <div className={cn('bottom')}>
                <div className={cn('bottom', 'price')}>
                    {getPrice()}
                </div>
                <div className={cn('bottom', 'add')}>
                    <InputNumber defaultValue={0}
                        onChange={onChangeAmount}
                        precision={0}
                        min={0} />
                </div>
            </div>
        </Card>
    );
};

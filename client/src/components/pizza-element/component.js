import React from 'react';
import { Card, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import { useClassName } from 'utils/cn';

import './style.less';

const { Meta } = Card;

const PizzaElement = ({
    pizza, currency, onChangeItem, type, amount
}) => {
    const cn = useClassName('pizza-element');
    const {
        title, description, id, price
    } = pizza;

    const getPrice = (amount = 0) => {
        const { euro, usd } = price;
        switch (currency) {
            case 'usd': return `${(usd * amount).toFixed(2)} USD`;
            case 'euro':
            default: return `${(euro * amount).toFixed(2)} Euro`;
        }
    };

    const onChangeAmount = (value) => {
        onChangeItem(id, value);
    };

    return (
        <Card hoverable
            className={cn({ [type]: !!type })}
            cover={<img alt={title} src={`/images/${id}.png`} />}>
            <Meta title={title} description={description} />
            <div className={cn('bottom')}>
                <div className={cn('bottom', 'element')}>
                    <div className={cn('bottom', 'element', 'price')}>
                        {getPrice(1)}
                    </div>
                    <div className={cn('bottom', 'element', 'add')}>
                        <InputNumber value={amount}
                            onChange={onChangeAmount}
                            precision={0}
                            min={0} />
                    </div>
                </div>
                <div className={cn('bottom', 'element', 'total')}>
                    {`Total: ${getPrice(amount)}`}
                </div>
            </div>
        </Card>
    );
};

PizzaElement.propTypes = {
    pizza: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string,
        price: PropTypes.shape({
            euro: PropTypes.number,
            usd: PropTypes.number
        })
    }).isRequired,
    currency: PropTypes.string.isRequired,
    onChangeItem: PropTypes.func.isRequired,
    type: PropTypes.string,
    amount: PropTypes.number.isRequired
};

PizzaElement.defaultProps = {
    type: undefined
};

export default PizzaElement;

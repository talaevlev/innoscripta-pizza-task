import React, { useContext, useState, useEffect } from 'react';
import {
    Button, Modal, notification, Popconfirm
} from 'antd';
import PropTypes from 'prop-types';

import { getDeliveries, addDelivery } from 'models/delivers/api';
import { userStore } from 'models/user/context';
import { pizzasStore } from 'models/pizzas/context';
import { useClassName } from 'utils/cn';

import './style.less';

const DeliveryItem = ({
    name, address, items, total, date, email, onCancel
}) => {
    const cn = useClassName('delivery-history-item');
    const { state: { pizzas, pizzaPrices } } = useContext(pizzasStore);

    const onRepeatOrder = () => {
        addDelivery(email, name, address, items, total);
        onCancel();
        notification.success({
            message: 'Thank you for your order!',
            description: 'We will deliver it as soon as possible'
        });
    };

    const getPizzaTitle = (pizzaId) => {
        const pizza = pizzas.find(({ id }) => (id === pizzaId));

        return pizza?.title ?? 'Unknown';
    };

    const getPrice = (pizzaId, amount) => ({
        euro: ((pizzaPrices[pizzaId]?.euro ?? 0) * amount).toFixed(2),
        usd: ((pizzaPrices[pizzaId]?.usd ?? 0) * amount).toFixed(2)
    });

    const totalLabel = `${(total.euro).toFixed(2)} Euro/${(total.usd).toFixed(2)} USD`;

    return (
        <div className={cn()}>
            <div className={cn('info')}>
                <div className={cn('info', 'element')}>
                    <div className={cn('info', 'element', 'label')}>
                        Name:
                    </div>
                    <div className={cn('info', 'element', 'data')}>
                        {name}
                    </div>
                </div>
                <div className={cn('info', 'element')}>
                    <div className={cn('info', 'element', 'label')}>
                        Address:
                    </div>
                    <div className={cn('info', 'element', 'data')}>
                        {address}
                    </div>
                </div>
                <div className={cn('info', 'element', 'items')}>
                    <div className={cn('info', 'element', 'items', 'label')}>
                        What was in this order:
                    </div>
                    <div className={cn('info', 'element', 'items', 'data')}>
                        {Object.keys(items).map(id => {
                            const { euro, usd } = getPrice(id, items[id]);

                            return (
                                <div key={id}
                                    className={cn('info', 'element', 'items', 'data', 'element')}>
                                    <span>{getPizzaTitle(id)}</span>
                                    <span>{`Amount: ${items[id]}`}</span>
                                    <span>{`Total price: ${euro} Euro/${usd} USD`}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cn('info', 'element')}>
                    <div className={cn('info', 'element', 'label')}>
                        Total price:
                    </div>
                    <div className={cn('info', 'element', 'data')}>
                        {totalLabel}
                    </div>
                </div>
                <div className={cn('info', 'element')}>
                    <div className={cn('info', 'element', 'label')}>
                        Date:
                    </div>
                    <div className={cn('info', 'element', 'data')}>
                        {date}
                    </div>
                </div>
            </div>
            <Popconfirm title="Are you sure?" onConfirm={onRepeatOrder}>
                <Button type="primary" size="large">Repeat</Button>
            </Popconfirm>
        </div>
    );
};

const ModalContent = ({ onCancel }) => {
    const cn = useClassName('delivery-history');
    const { state: { email } } = useContext(userStore);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getDeliveries(email));
    }, []);

    return (
        <div className={cn()}>
            {history.map((item) => (
                <DeliveryItem key={`${item.name} ${item.address} ${item.date}`}
                    email={email}
                    onCancel={onCancel}
                    {...item} />
            ))}
        </div>
    );
};

const ModalDeliveryHistory = ({ visible, onCancel }) => (
    <Modal centered
        title="Delivery history"
        width={650}
        visible={visible}
        destroyOnClose
        footer={null}
        onCancel={onCancel}>
        <ModalContent onCancel={onCancel} />
    </Modal>
);

ModalDeliveryHistory.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
};

ModalContent.propTypes = {
    onCancel: PropTypes.func.isRequired
};

DeliveryItem.propTypes = {
    onCancel: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    total: PropTypes.shape({ euro: PropTypes.number, usd: PropTypes.number }).isRequired,
    date: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export default ModalDeliveryHistory;

import React, { useContext } from 'react';
import {
    Modal, Form, Input, Button, notification
} from 'antd';
import PropTypes from 'prop-types';

import { addDelivery } from 'models/delivers/api';
import { cartItemsStore, clearCartAction } from 'models/cart/context';
import { userStore } from 'models/user/context';
import { useClassName } from 'utils/cn';

import './style.less';

const { Item, useForm } = Form;
const DELIVERY_COAST = { euro: 5, usd: 5.72 };

const ModalContent = ({ onCancel }) => {
    const cn = useClassName('delivery-info');
    const { state: { items, total }, dispatch } = useContext(cartItemsStore);
    const { state: { email } } = useContext(userStore);
    const [formDelivery] = useForm();

    const onSuccess = (values) => {
        const { name, address } = values;
        if (email) {
            addDelivery(email, name, address, items, total);
        }
        onCancel();
        dispatch(clearCartAction());
        notification.success({
            message: 'Thank you for your order!',
            description: 'We will deliver it as soon as possible'
        });
    };

    const getTotalCoast = ({
        euro: total.euro + DELIVERY_COAST.euro,
        usd: total.usd + DELIVERY_COAST.usd
    });

    return (
        <div className={cn()}>
            <div className={cn('label')}>Please provide your delivery info</div>
            <Form className={cn('login-form')}
                layout="vertical"
                form={formDelivery}
                name="delivery"
                onFinish={onSuccess}>
                <Item name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please, enter your name' }]}>
                    <Input />
                </Item>
                <Item name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please, enter your address' }]}>
                    <Input />
                </Item>
                <div className={cn('total')}>
                    <div className={cn('total', 'pizzas')}>
                        {`Pizza's coast: ${total.euro.toFixed(2)} Euro/${total.usd.toFixed(2)} USD`}
                    </div>
                    <div className={cn('total', 'delivery')}>
                        {`Delivery coast: ${DELIVERY_COAST.euro} Euro/${DELIVERY_COAST.usd} USD`}
                    </div>
                </div>
                <div className={cn('order')}>
                    <div className={cn('order', 'price')}>
                        {`Total: ${getTotalCoast.euro.toFixed(2)} Euro/${getTotalCoast.usd.toFixed(2)} USD`}
                    </div>
                    <Button htmlType="submit" size="large" type="primary">Order</Button>
                </div>
            </Form>
        </div>
    );
};

const ModalDeliveryInfo = ({ visible, onCancel }) => (
    <Modal centered
        title="Delivery info"
        width={500}
        visible={visible}
        destroyOnClose
        footer={null}
        onCancel={onCancel}>
        <ModalContent onCancel={onCancel} />
    </Modal>
);

ModalDeliveryInfo.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
};

ModalContent.propTypes = {
    onCancel: PropTypes.func.isRequired
};

export default ModalDeliveryInfo;

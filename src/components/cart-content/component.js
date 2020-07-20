import React, { useContext, useMemo, useEffect } from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';

import { cartItemsStore } from 'models/cart/context';
import { PizzasWrap } from 'components';
import { useClassName } from 'utils/cn';

import './style.less';

const ModalContent = ({ onCancel, visible, openDeliveryModal }) => {
    const cn = useClassName('cart-content');
    const { state: { items, total } } = useContext(cartItemsStore);

    const filteredItems = useMemo(() => (
        Object.keys(items).reduce((acc, key) => (
            items[key] ? { ...acc, [key]: items[key] } : { ...acc }
        ), {})
    ), [items]);

    useEffect(() => {
        if (visible && !Object.keys(filteredItems)?.length) onCancel();
    }, [filteredItems]);

    const onClickProceed = () => {
        onCancel();
        openDeliveryModal();
    };

    return (
        <div className={cn()}>
            <PizzasWrap selectedPizzas={filteredItems} type="inline" />
            <div className={cn('total')}>
                <div className={cn('total', 'info')}>
                    <div className={cn('total', 'info', 'label')}>Total:</div>
                    <div className={cn('total', 'info', 'prices')}>
                        <div className={cn('total', 'info', 'prices', 'euro')}>
                            {total.euro.toFixed(2)} Euro/
                        </div>
                        <div className={cn('total', 'info', 'prices', 'usd')}>
                            {total.usd.toFixed(2)} USD
                        </div>
                    </div>
                </div>
                <Button type="primary" size="large" onClick={onClickProceed}>
                    Proceed
                </Button>
            </div>
        </div>
    );
};

const CartContentModal = ({ visible, onCancel, openDeliveryModal }) => (
    <Modal centered
        title="Cart"
        width={800}
        visible={visible}
        destroyOnClose
        footer={null}
        onCancel={onCancel}>
        <ModalContent onCancel={onCancel}
            visible={visible}
            openDeliveryModal={openDeliveryModal} />
    </Modal>
);

CartContentModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    openDeliveryModal: PropTypes.func.isRequired
};

ModalContent.propTypes = {
    onCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    openDeliveryModal: PropTypes.func.isRequired
};

export default CartContentModal;

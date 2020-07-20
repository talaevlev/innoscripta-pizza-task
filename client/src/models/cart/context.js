import React, { useReducer, createContext } from 'react';

const constants = {
    SET_CART_ITEM: 'SET_CART_ITEM',
    CLEAR_CART: 'CLEAR_CART'
};

export const setCartItemAction = (itemId, value, pizzaPrices) => ({
    type: constants.SET_CART_ITEM,
    payload: { itemId, value, pizzaPrices }
});

export const clearCartAction = () => ({
    type: constants.CLEAR_CART
});

const initialState = { items: {}, total: { euro: 0, usd: 0 } };
const cartItemsStore = createContext(initialState);

const { Provider } = cartItemsStore;

const CartItemsProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case constants.SET_CART_ITEM:
                const { itemId, value, pizzaPrices } = action.payload;
                const items = { ...state.items, [itemId]: value };

                return {
                    items,
                    total: Object.keys(items).reduce((acc, key) => ({
                        euro: acc.euro + pizzaPrices[key].euro * items[key],
                        usd: acc.usd + pizzaPrices[key].usd * items[key]
                    }), { euro: 0, usd: 0 })
                };
            case constants.CLEAR_CART:
                return { ...initialState };
            default:
                return state;
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { cartItemsStore, CartItemsProvider };

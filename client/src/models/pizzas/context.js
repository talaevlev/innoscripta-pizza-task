import React, { useReducer, createContext } from 'react';

const constants = {
    SET_PIZZAS: 'SET_PIZZAS'
};

export const setPizzasAction = (pizzas) => ({
    type: constants.SET_PIZZAS,
    payload: pizzas
});

const initialState = { pizzas: [], pizzaPrices: {} };
const pizzasStore = createContext(initialState);

const { Provider } = pizzasStore;

const PizzasProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case constants.SET_PIZZAS:
                return {
                    pizzas: action.payload,
                    pizzaPrices: action.payload
                        .reduce((acc, { id, price }) => ({ ...acc, [id]: price }), {})
                };
            default:
                return state;
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { pizzasStore, PizzasProvider };

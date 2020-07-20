import React, { useReducer, createContext } from 'react';

const constants = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
};

export const setUserAction = (email) => ({
    type: constants.LOGIN,
    payload: email
});

export const unsetUserAction = () => ({
    type: constants.LOGOUT
});

const initialState = { isAuth: false };
const userStore = createContext(initialState);

const { Provider } = userStore;

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case constants.LOGIN:
                return { isAuth: true, email: action.payload };
            case constants.LOGOUT:
                return { isAuth: false };
            default:
                return state;
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { userStore, UserProvider };

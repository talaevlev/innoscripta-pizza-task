export const createUser = (email, password) => {
    const users = localStorage.getItem('users');
    let newUsers = { [email]: password };
    if (users) {
        const oldUsers = JSON.parse(users);
        if (Object.keys(oldUsers).includes(email)) return false;
        newUsers = { ...JSON.parse(users), ...newUsers };
    }
    localStorage.setItem('users', JSON.stringify(newUsers));
    return true;
};

export const isUserExistAndLogin = (email, password) => {
    const storage = localStorage.getItem('users');

    if (!storage) return false;

    const users = JSON.parse(storage);

    if (Object.keys(users).includes(email) && users[email] === password) {
        return email;
    } else return false;
};

export const setStorageUser = (isAuth, email) => {
    localStorage.setItem('user', JSON.stringify({ isAuth, email }));
};

export const getStorageUser = () => {
    const storage = localStorage.getItem('user');
    if (!storage) return { isAuth: false };
    return JSON.parse(storage);
};

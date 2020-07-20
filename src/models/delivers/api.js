import moment from 'moment';

export const addDelivery = (email, name, address, items, total) => {
    const storage = localStorage.getItem('delivers');

    const date = moment.utc().format('YYYY-MM-DD HH:mm');
    const stillUtc = moment.utc(date).toDate();
    const localDateTime = moment(stillUtc).local().format('YYYY-MM-DD HH:mm');

    const deliveries = storage ? JSON.parse(storage) : {};
    const newDelivery = {
        name, address, items, total, date: localDateTime
    };

    const newDeliveries = {
        ...deliveries,
        [email]: deliveries[email] ? [...deliveries[email], newDelivery] : [newDelivery]
    };
    localStorage.setItem('delivers', JSON.stringify(newDeliveries));
};

export const getDeliveries = (email) => {
    const storage = localStorage.getItem('delivers');

    if (!storage) return {};

    const deliveries = JSON.parse(storage);

    return deliveries[email] ?? [];
};

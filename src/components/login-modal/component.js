import React, { useState, useContext } from 'react';
import {
    Modal, Input, Button, Form, Tabs
} from 'antd';
import PropTypes from 'prop-types';

import { createUser, isUserExistAndLogin, setStorageUser } from 'models/user/api';
import { userStore, setUserAction } from 'models/user/context';
import { useClassName } from 'utils/cn';

import './style.less';

const { Item, useForm } = Form;
const { TabPane } = Tabs;

const ModalContent = ({ onCancel }) => {
    const cn = useClassName('login-modal');
    const [showLoginWarningText, setShowLoginWarningText] = useState(false);
    const [showRegisterWarningText, setShowRegisterWarningText] = useState(false);
    const { dispatch } = useContext(userStore);
    const [formLogin] = useForm();
    const [formRegister] = useForm();

    const setUser = (email) => {
        dispatch(setUserAction(email));
        setStorageUser(true, email);
    };

    const onLogin = (values) => {
        const { email, password } = values;
        const result = isUserExistAndLogin(email, password);
        if (result) {
            setUser(email);
            onCancel();
        } else setShowLoginWarningText(true);
    };

    const onRegister = (values) => {
        const { email, password } = values;
        const result = createUser(email, password);
        if (!result) setShowRegisterWarningText(true);
        else {
            setUser(email);
            onCancel();
        }
    };

    const validatePassword2 = ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        }
    });

    return (
        <div>
            {showLoginWarningText && (
                <div className={cn('warning-text')}>
            Sorry, this user or password does not match
                </div>
            )}
            {showRegisterWarningText && (
                <div className={cn('warning-text')}>
            Sorry, this user already exist
                </div>
            )}
            <Tabs>
                <TabPane key="login" tab="Login">
                    <Form className={cn('login-form')}
                        layout="vertical"
                        form={formLogin}
                        name="email"
                        onFinish={onLogin}>
                        <Item name="email"
                            label="E-mail"
                            rules={[{ type: 'email', message: 'The input is not valid E-mail!' },
                                { required: true, message: 'Please, enter your E-mail' }]}>
                            <Input />
                        </Item>
                        <Item name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please, enter your password' }]}>
                            <Input.Password />
                        </Item>
                        <Button type="primary" htmlType="submit">Login</Button>
                    </Form>
                </TabPane>
                <TabPane key="register" tab="Register">
                    <Form className={cn('register-form')}
                        layout="vertical"
                        form={formRegister}
                        name="email"
                        onFinish={onRegister}>
                        <Item name="email"
                            label="E-mail"
                            rules={[{ type: 'email', message: 'The input is not valid E-mail!' },
                                { required: true, message: 'Please, enter your E-mail' }]}>
                            <Input />
                        </Item>
                        <Item name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please, enter your password' }]}>
                            <Input.Password />
                        </Item>
                        <Item name="password2"
                            label="Password again"
                            hasFeedback
                            dependencies={['password']}
                            rules={[{ required: true, message: 'Please, enter your password' },
                                validatePassword2]}>
                            <Input.Password />
                        </Item>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    );
};

const LoginModal = ({ visible, onCancel }) => (
    <Modal centered
        title="Login window"
        width={350}
        visible={visible}
        destroyOnClose
        footer={null}
        onCancel={onCancel}>
        <ModalContent onCancel={onCancel} />
    </Modal>
);

LoginModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
};

ModalContent.propTypes = {
    onCancel: PropTypes.func.isRequired
};

export default LoginModal;

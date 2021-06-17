import React from 'react';
import Cookie from 'js-cookie';
import { useHistory, useLocation } from 'umi';
import isJWT from 'validator/es/lib/isJWT';

import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { setUser } from '@/store/UserStore';

import { message } from 'antd';

import { UserAPI } from '@/api';

export default function LoginWrapper<T extends object>(Component: React.ComponentType<T>) {
    return function Wrapper(props: T) {
        const [loading, setLoading] = React.useState<boolean>(true);

        const _history = useHistory();
        const _location = useLocation();
        const _dispatch = useDispatch();

        const isLoginPage = /\/login/.test(_location.pathname);

        React.useEffect(() => {
            const token = Cookie.get(AUTHORIZATION_KEY);

            if (!token || !isJWT(token)) {
                !isLoginPage && _history.replace('/login');
                // setLoading(false);
                return; 
            }

            UserAPI.verificationUserLoginJWT().then(userData => {
                _dispatch(setUser({
                    id: nanoid(),
                    user: userData
                }));
            }, err => {
                message.error(err.message || JSON.stringify(err));
                !isLoginPage && _history.replace('/login');
            }).finally(() => {
                // setLoading(false);
            });
        }, []);

        return <Component {...props} />;
    }
}
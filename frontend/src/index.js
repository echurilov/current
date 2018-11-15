import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import 'normalize.css';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';
import * as APIUtil from './util/session_api_util';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store = configureStore();

    if (localStorage.jwtToken) {
        APIUtil.setAuthToken(localStorage.jwtToken);
        const decoded = jwt_decode(localStorage.jwtToken);
        store.dispatch(APIUtil.setCurrentUser(decoded));

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            store.dispatch(APIUtil.logoutUser());
            window.location.href = '/';
        }
    }

    ReactDOM.render(<Root store={store} />, root);
})

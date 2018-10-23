import axios from 'axios';
import jwt_decode from 'jwt-decode';

// const $ = window.$;
export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

// passing auth token through axios (session token cookie) - takes token or false

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// set current user 

export const setCurrentUser = decoded => {
    // debugger
    return {
        type: RECEIVE_CURRENT_USER,
        payload: decoded
    };
};

// sign up user

export const registerUser = (userData) => dispatch => {
    // debugger 
    axios
        .post('/api/users/register', userData)
        .then(res => {
            // debugger
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// log in user

export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            // debugger
            dispatch({ type: GET_ERRORS, payload: err.response.data });
            }
        );
};

// log out user

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    
    // debugger
    setAuthToken(false);

    dispatch(setCurrentUser({}));
};
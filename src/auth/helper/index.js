import { API } from '../../backend';

export const signup = user => {
    return fetch(`${API}signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( res => {
        return res.json()
    })
    .catch(err => console.log(err))
};

export const signin = user => {
    return fetch(`${API}signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( res => {
        return res.json()
    })
    .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if(typeof window !== undefined){
        localStorage.removeItem('jwt');
        next();

        return fetch(`${API}signout`, {
            method: 'GET'
        })
        .then(res => console.log('sign out success'))
        .catch(err => console.log(err))
    }
};

export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false;
    }
    
    const jwt = localStorage.getItem('jwt');
    // console.log(typeof token); // --> string type
    if(jwt !== "undefined" && jwt !== null){
        return JSON.parse(jwt);
    }else{
        return false;
    }
};
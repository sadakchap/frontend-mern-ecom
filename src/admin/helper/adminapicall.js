import { API } from '../../backend';

export const createCategory = (userId, token, categoryName) => {
    return fetch(`${API}category/create/${userId}`, {
        method: 'POST',
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(categoryName)
    })
    .then(res => res.json())
    .catch(err => console.log(`error while creating Category ${err}`));
};
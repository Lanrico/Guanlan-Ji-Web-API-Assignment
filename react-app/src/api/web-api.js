export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getUserFavourites = (username) => {
    return fetch(`/api/users/${username}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'get',
    }).then(res => res.json())
};

export const addToUserFavourites = (username, id) => {
    console.log(id)
    return fetch(`/api/users/${username}/favourites`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: id})
    }).then(res => res.json())
};

export const removeFromUserFavourites = (username, id) => {
    console.log(id)
    return fetch(`/api/users/${username}/favourites/remove`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({id: id})
    }).then(res => res.json())
};
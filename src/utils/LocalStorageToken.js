export const TOKEN = 'TOKEN';

export const getToken = () => {
    return localStorage.getItem(TOKEN);
}

export const setToken = (value) => {
    localStorage.setItem(TOKEN, value);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN);
}
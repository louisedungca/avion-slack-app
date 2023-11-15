// get local storage
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

// set local storage
export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
}
export { getStorageItem, setStorageItem, removeStorageItem };

function getStorageItem(key) {
  return localStorage.getItem(key);
}

function removeStorageItem(key) {
  localStorage.removeItem(key);
}

function setStorageItem(key, value){
    localStorage.setItem(key, value);
}
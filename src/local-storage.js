export { getStorageItem, setStorageItem };

function getStorageItem(key) {
  return localStorage.getItem(key);
}

function setStorageItem(key, value){
    localStorage.setItem(key, value);
}
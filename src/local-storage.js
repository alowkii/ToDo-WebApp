export { getStorageItem, setStorageItem, removeStorageItem };

function getStorageItem(key) {
  if(localStorage.getItem(key) == null){
    setStorageItem(key, JSON.stringify([]));
  }
  return localStorage.getItem(key);
}

function removeStorageItem(key) {
  localStorage.removeItem(key);
}

function setStorageItem(key, value){
    localStorage.setItem(key, value);
}
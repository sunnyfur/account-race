// import { getLocalStoreKey } from "./env";

export const getLocalStorageData = (key, keyData) => {
  const storageData = localStorage.getItem(key);

  if (!storageData) {
    return null;
  }
  if (keyData) {
    return JSON.parse(storageData)[keyData];
  }
  return JSON.parse(storageData);
};

export const setLocalStorageData = (key, keyData, data) => {
  const storageData = getLocalStorageData(key);

  if (!storageData) {
    return localStorage.setItem(key, JSON.stringify({ [keyData]: data }));
  }
  storageData[keyData] = data;
  window.localStorage.setItem(key, JSON.stringify(storageData));
};

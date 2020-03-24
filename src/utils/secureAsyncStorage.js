import { SecureAsyncStorage } from '@youi/react-native-youi';

export const setItemInAsyncStore = item => {
  const key = item.id.toString();
  const value = JSON.stringify(item);

  SecureAsyncStorage.setItem(key, value);
};

export const removeItemFromAsyncStore = id => {
  const key = id.toString();

  SecureAsyncStorage.removeItem(key);
};

export const getKeysFromAsyncStore = () => SecureAsyncStorage.getAllKeys();

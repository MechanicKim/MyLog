import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLog = async (key, log) => {
  try {
    const jsonValue = JSON.stringify(log);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const loadLog = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};

export const removeLog = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};

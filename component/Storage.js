import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLog = async dailyLog => {
  try {
    const jsonValue = JSON.stringify(dailyLog);
    await AsyncStorage.setItem(dailyLog.id, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getLog = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
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

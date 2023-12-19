import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';
//This is a custom hook that allows us to store data in the local storage of the device.
//Hooks let you use state and other React features without writing a class.
type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];
//this is a custom hook that allows us to store data in the local storage of the device.
function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}
//this checks if you are on the web or not and then sets the local storage item.
export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}
//this is the hook that allows us to use the local storage.
export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value: any) => {
        setState(value);
      });
    }
  }, [key]);

  // Set
  //this is the function that allows us to set the local storage item.
  const setValue = React.useCallback(
    (value: string | null) => {
      setStorageItemAsync(key, value).then(() => {
        setState(value);
      });
    },
    [key]
  );

  return [state, setValue];
}

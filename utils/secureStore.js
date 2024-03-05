import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

export const saveStoreItemAsync = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);

    } catch (error) {
        localStorage.setItem(key, value)
    }
}


export const getStoreItemAsync = async (key) => {

    try {
        let result = await SecureStore.getItemAsync(key);
        return result;
    } catch (error) {
        let result = localStorage.getItem(key)
        return result;
    }

}
// import I18n from '../../../i18n';
import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_STORE_CONFIG_DATA, GET_AVAILABLE_STORES_DATA } from './storeSwitcher.gql';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { setStore, clearStore } from '../../redux/reducers/app'
import { useSelector, useDispatch } from 'react-redux'

export const useStoreSwitcher = props => {

    const { store } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    const { data: storeCOnfiData } = useQuery(GET_STORE_CONFIG_DATA, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const { data: availableStoresData } = useQuery(GET_AVAILABLE_STORES_DATA, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    console.log('availableStoresData', availableStoresData);

    const stores = availableStoresData ? availableStoresData.availableStores : [];

    const hanldeStoreSwitch = useCallback((locale) => {

        dispatch(setStore({
            locale: locale
        }))
        
    }, [dispatch])


    return {
        currentLocale:store.locale,
        stores,
        hanldeStoreSwitch
    }

}
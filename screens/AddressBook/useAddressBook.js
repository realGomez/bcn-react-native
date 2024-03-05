import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CUSTOMER_QUERY } from './addressBook.gql';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { setShippingAddress, setEditAddress } from '../../redux/reducers/checkout'
import { useSelector, useDispatch } from 'react-redux'

export const useAddressBook = props => {

    const { navigation } = props


    const { shippingAddress } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const { data, error, loading } = useQuery(GET_CUSTOMER_QUERY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });


    const addresses = useMemo(() => {
        return data && data.customer ? data.customer.addresses : []
    }, [data])


    useEffect(() => {

        const defaultAddress = addresses.find(address => {
            return address.default_shipping
        })

        if (defaultAddress) {
            dispatch(setShippingAddress(defaultAddress))
        }

    }, [addresses])


    const handleEditAddress = useCallback((address) => {

        dispatch(setEditAddress(address))
        navigation.navigate('EditAddress', {
            // address:address
        })
    }, [dispatch, setEditAddress, navigation])

    return {
        addresses,
        shippingAddress,
        handleEditAddress
    }

}
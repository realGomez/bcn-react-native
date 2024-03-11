import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CUSTOMER_QUERY } from './addressBook.gql';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { setShippingAddress, setEditAddress } from '../../redux/reducers/checkout'
import { useSelector, useDispatch } from 'react-redux'

export const useAddressBook = props => {

    const {
        navigation,
        shouldRefetch
    } = props


    const { shippingAddress } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const { data, error, loading, refetch } = useQuery(GET_CUSTOMER_QUERY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    useEffect(() => {

        if (shouldRefetch) {
            refetch()
        }
    }, [refetch, shouldRefetch])

    const addresses = useMemo(() => {
        return data && data.customer ? data.customer.addresses : []
    }, [data])



    const handleEditAddress = useCallback((address) => {

        dispatch(setEditAddress(address))
        navigation.navigate('EditAddress', {
            // address:address
        })
    }, [dispatch, setEditAddress, navigation])

    const handleSelectShippingAddress = useCallback((address) => {

        dispatch(setShippingAddress(address))
        // navigation.navigate('EditAddress', {
        // })
    }, [dispatch, setShippingAddress, navigation])

    return {
        addresses,
        shippingAddress,
        handleEditAddress,
        handleSelectShippingAddress
    }

}
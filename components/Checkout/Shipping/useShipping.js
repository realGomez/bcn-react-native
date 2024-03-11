import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CUSTOMER_QUERY } from '../../../screens/AddressBook/addressBook.gql';
import { GET_CART_SHIPPING, SET_CUSTOMER_ADDRESS_ON_CART } from './shippoing.gql';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { setShippingAddress, setEditAddress, setSubmitStep, setValidStep } from '../../../redux/reducers/checkout'
import { useSelector, useDispatch } from 'react-redux'

export const useShipping = props => {

    const { navigation } = props

    const { cartId } = useSelector((state) => state.cart)
    const { shippingAddress, validStep, submitStep } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const [selectedShippingMethod, setSelectedShippingMethod] = useState('');

    const { data, error, loading } = useQuery(GET_CUSTOMER_QUERY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });

    const { data: cartData, error: cartError, loading: cartLoading } = useQuery(GET_CART_SHIPPING, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: { cart_id: cartId }
    });

    const [
        setCustomerAddressOnCart,
        {
            error: setCustomerAddressOnCartError,
            loading: setCustomerAddressOnCartLoading
        }
    ] = useMutation(SET_CUSTOMER_ADDRESS_ON_CART);

    const shippingAddresses = useMemo(() => {
        return cartData && cartData.cart && cartData.cart.shipping_addresses.length ? cartData.cart.shipping_addresses[0] : null;
    }, [cartData])

    const availableShippingMethods = shippingAddresses ? shippingAddresses.available_shipping_methods : [];

    const addresses = useMemo(() => {
        return data && data.customer ? data.customer.addresses : [];
    }, [data])


    useEffect(() => {

        const defaultAddress = addresses.find(address => {
            return address.default_shipping
        })

        if (defaultAddress) {
            dispatch(setShippingAddress(defaultAddress))
        }

    }, [addresses])

    const hanldeSelectedShippingMethod = useCallback((code) => {

        const match = availableShippingMethods.find(item => {
            return item.carrier_code == code
        })
        setSelectedShippingMethod(match)


    }, [
        setSelectedShippingMethod,
        availableShippingMethods
    ])

    const hanldeSubmit = useCallback(async () => {
        await setCustomerAddressOnCart({
            variables: {
                input: {
                    cart_id: cartId,
                    shipping_addresses: [{
                        address: {
                            firstname: shippingAddress.firstname,
                            lastname: '...',
                            street: [shippingAddress.street[0]],
                            city: shippingAddress.region2,
                            region: shippingAddress.region2,
                            postcode: "000000",
                            country_code: 'CN',
                            telephone: shippingAddress.telephone,
                            // phone_area: phone_area,
                            save_in_address_book: false,
                        }
                    }]
                }
            }

        })
    }, [shippingAddress])

    return {
        shippingAddress,
        availableShippingMethods,
        selectedShippingMethod,
        hanldeSelectedShippingMethod
    }

}
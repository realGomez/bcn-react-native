import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CUSTOMER_QUERY } from '../../../screens/AddressBook/addressBook.gql';
import { GET_CART_SHIPPING, SET_CUSTOMER_ADDRESS_ON_CART, SET_SHIPPING_METHOD } from './shippoing.gql';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { setShippingAddress, setEditAddress, setNextValidStep, setNextSubmitStep } from '../../../redux/reducers/checkout'
import { useSelector, useDispatch } from 'react-redux'

export const useShipping = props => {

    const { navigation } = props

    const { cartId } = useSelector((state) => state.cart)
    const { shippingAddress, stepCodes, validStep, submitStep } = useSelector((state) => state.checkout)
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

    // console.log('shipping cartData', JSON.stringify(cartData));

    const [
        setCustomerAddressOnCart,
        {
            error: setCustomerAddressOnCartError,
            loading: setCustomerAddressOnCartLoading
        }
    ] = useMutation(SET_CUSTOMER_ADDRESS_ON_CART);

    const [
        setShippingMethodsOnCart,
        {
            error: setShippingMethodsOnCartError,
            loading: setShippingMethodsOnCartLoading
        }
    ] = useMutation(SET_SHIPPING_METHOD);


    const shippingAddresses = useMemo(() => {
        return cartData && cartData.cart && cartData.cart.shipping_addresses.length ? cartData.cart.shipping_addresses[0] : null;
    }, [cartData])

    const availableShippingMethods = shippingAddresses && shippingAddresses.available_shipping_methods ? shippingAddresses.available_shipping_methods : [];

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


    useEffect(() => {
        if (validStep == 'shipping' && selectedShippingMethod && shippingAddress) {
            dispatch(setNextValidStep({
                code: 'payment',
                stepCodes: stepCodes
            }))
        } else if (validStep == 'shipping' && (!selectedShippingMethod || !shippingAddress)) {
            dispatch(setNextValidStep({
                code: '',
                stepCodes: stepCodes
            }))
        }

    }, [
        shippingAddress,
        stepCodes,
        validStep,
        // submitStep,
        selectedShippingMethod
    ])

    useEffect(() => {
        if (submitStep == 'shipping' && selectedShippingMethod && shippingAddress) {
            handleSubmit()
        }

    }, [
        shippingAddress,
        // stepCodes,
        // validStep,
        submitStep,
        selectedShippingMethod
    ])


    const handleSubmit = useCallback(async () => {
        try {


            await setCustomerAddressOnCart({
                variables: {
                    input: {
                        cart_id: cartId,
                        shipping_addresses: [{
                            address: {
                                firstname: shippingAddress.firstname,
                                lastname: '...',
                                street: shippingAddress.street,
                                city: shippingAddress.city,
                                // city_id: city_id,
                                region: shippingAddress.region.region,
                                region_id: shippingAddress.region.region_id,
                                postcode: "000000",
                                country_code: shippingAddress.country_code,
                                telephone: shippingAddress.telephone,
                                save_in_address_book: false
                            }
                        }]
                    }
                }

            })

            await setShippingMethodsOnCart({
                variables: {
                    cartId: cartId,
                    shippingMethod: {
                        carrier_code: selectedShippingMethod.carrier_code,
                        method_code: selectedShippingMethod.method_code
                    }
                }

            })


            dispatch(setNextSubmitStep({
                code: 'payment',
                stepCodes: stepCodes
            }))
        } catch (error) {
            console.log('shipping error', error);
            dispatch(setNextSubmitStep({
                code: '',
                stepCodes: stepCodes
            }))
        }

    }, [
        stepCodes,
        shippingAddress,
        selectedShippingMethod
    ])

    const errors = useMemo(
        () =>
            new Map([
                ['setCustomerAddressOnCartError', setCustomerAddressOnCartError],
                ['setShippingMethodsOnCartError', setShippingMethodsOnCartError]

            ]),
        [setCustomerAddressOnCartError, setShippingMethodsOnCartError]
    );

    return {
        errors,
        shippingAddress,
        availableShippingMethods,
        selectedShippingMethod,
        hanldeSelectedShippingMethod
    }

}
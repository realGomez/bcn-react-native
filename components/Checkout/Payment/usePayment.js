import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_PAYMENT_INFORMATION, SET_PAYMENT_METHOD_ON_CART, SET_BILLING_ADDRESS } from './paymentInformation.gql';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { setShippingAddress, setEditAddress, setNextValidStep, setNextSubmitStep } from '../../../redux/reducers/checkout'
import { useSelector, useDispatch } from 'react-redux'

export const usePayment = props => {

    const { navigation } = props

    const { cartId } = useSelector((state) => state.cart)
    const { shippingAddress, stepCodes, validStep, submitStep } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const { data: cartData, error: cartError, loading: cartLoading } = useQuery(GET_PAYMENT_INFORMATION, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: { cartId: cartId }
    });

    // console.log('payment cartData', JSON.stringify(cartData));

    const [
        setPaymentMethod,
        {
            error: setPaymentMethodOnCartError,
            loading: setPaymentMethodOnCartLoading
        }
    ] = useMutation(SET_PAYMENT_METHOD_ON_CART);

    const [setBillingAddress, {
        loading: setBillingAddressLoading,
        error: setBillingAddressError,

    }] = useMutation(SET_BILLING_ADDRESS);

    const availablePaymentMethods = useMemo(() => {
        return cartData && cartData.cart && cartData.cart.available_payment_methods.length ? cartData.cart.available_payment_methods : [];
    }, [cartData])


    const hanldeSelectedPaymentMethod = useCallback((code) => {
        const match = availablePaymentMethods.find(item => {
            return item.code == code
        })
        setSelectedPaymentMethod(match)

    }, [availablePaymentMethods])

    useEffect(() => {
        if (validStep == 'payment' && selectedPaymentMethod) {
            // dispatch(setNextValidStep({
            //     code: 'payment',
            //     stepCodes: stepCodes
            // }))
            dispatch(setNextSubmitStep({
                code: 'shipping',
                stepCodes: stepCodes
            }))
            dispatch(setNextValidStep({
                code: '',
                stepCodes: stepCodes
            }))
        } else if (validStep == 'payment' && (!selectedPaymentMethod)) {
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
        selectedPaymentMethod
    ])

    useEffect(() => {
        if (submitStep == 'payment' && selectedPaymentMethod) {

            handleSubmit()
        }

    }, [
        shippingAddress,
        // stepCodes,
        // validStep,
        submitStep,
        selectedPaymentMethod
    ])

    const handleSubmit = useCallback(
        async formValues => {

            try {
                const shippingData = await setPaymentMethod({
                    variables: {
                        cartId,
                        code: selectedPaymentMethod.code

                        //paymentNonce: nonce
                    }
                });

                const shippingAddress = shippingData.data.setPaymentMethodOnCart.cart.shipping_addresses[0]

                const {
                    firstname,
                    lastname,
                    country,
                    street,
                    city,
                    city_id,
                    county,
                    county_id,
                    region,
                    postcode,
                    telephone,
                    // phone_area
                } = shippingAddress;

                await setBillingAddress({
                    variables: {
                        cartId,
                        firstname,
                        lastname,
                        countryCode: country.code,
                        street,
                        city,
                        city_id,
                        county,
                        // county_id,
                        regionCode: region.code,
                        postcode,
                        // phone_area,
                        telephone,
                        sameAsShipping: true

                    }
                })

                dispatch(setNextSubmitStep({
                    code: 'place_order',
                    stepCodes: stepCodes
                }))

            } catch (error) {
                console.log('payment error', error);
                // handleStepSubmitingError('payment')
                dispatch(setNextSubmitStep({
                    code: '',
                    stepCodes: stepCodes
                }))
            }


        }, [
        setPaymentMethod,
        shippingAddress,
        selectedPaymentMethod
    ])

    const errors = useMemo(
        () =>
            new Map([
                ['setPaymentMethodOnCartError', setPaymentMethodOnCartError],
                ['setBillingAddressError', setBillingAddressError]

            ]),
        [setPaymentMethodOnCartError, setBillingAddressError]
    );

    return {
        errors,
        availablePaymentMethods,
        selectedPaymentMethod,
        hanldeSelectedPaymentMethod
    }

}
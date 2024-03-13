import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CART_DETAIL, CREATE_CART, PLACE_ORDER } from './checkout.gql';
import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { setNextValidStep, setNextSubmitStep, setErrorStep } from '../../redux/reducers/checkout'
import { setCartId, setTotalQuantity } from '../../redux/reducers/cart'

import { useSelector, useDispatch } from 'react-redux'

export const useCheckout = props => {

    const {
        navigation
    } = props;

    const { cartId } = useSelector((state) => state.cart)
    const { stepCodes, validStep, submitStep, errorStep } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const [enableRedirect, setEnableRedirect] = useState(false);
    const scrollViewRef = useRef(null)

    const { data, error, loading } = useQuery(GET_CART_DETAIL, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: { cart_id: cartId }

    });

    const [
        placeOrder,
        {
            data: placeOrderData,
            error: placeOrderError,
            loading: placeOrderLoading,
            called: placeOrderCalled
        }
    ] = useMutation(PLACE_ORDER);

    const [createCart, { error: createCartError }] = useMutation(CREATE_CART);


    const cartItems = useMemo(() => {
        return (data && data.cart.items) || [];
    }, [data]);


    const totalQuantity = useMemo(() => {
        return (data && data.cart.total_quantity) || 0;
    }, [data]);

    const prices = useMemo(() => {
        return (data && data.cart.prices) || 0;
    }, [data]);


    console.log('validStep, submitStep', validStep, '-', submitStep);

    // console.log('cart data', data);
    // console.log('cart error', error);

    const handlePlaceOrder = useCallback(() => {

        console.log('placeOrder index');

        dispatch(setNextValidStep({
            code: 'shipping',
            stepCodes: stepCodes
        }))
    }, [
        setNextValidStep,
        stepCodes
    ])

    const placeOrderAction = useCallback(async () => {

        try {

            await placeOrder({
                variables: {
                    cartId,
                }
            });

            const cartRes = await createCart({});

            dispatch(setCartId(cartRes.data.cartId))
            dispatch(setTotalQuantity(0))

            setEnableRedirect(true)

        } catch (error) {
            console.error('error', error);
        }


    }, [
        cartId,
        setEnableRedirect
    ])


    useEffect(() => {
        if (submitStep == 'place_order') {
            placeOrderAction()
        }
    }, [submitStep])


    useEffect(() => {

        console.log('placeOrderData', placeOrderData);
        if (placeOrderData && placeOrderData.placeOrder && placeOrderData.placeOrder.order && placeOrderData.placeOrder.order.order_number && enableRedirect) {
            // history.push(`/checkout/checkOrder?order_num=${placeOrderData.placeOrder.order.order_number}`);
            navigation.navigate('', {

            })
        }
    }, [
        placeOrderData,
        enableRedirect,
        navigation
    ])


    useEffect(() => {
        if (errorStep && scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
            dispatch(setErrorStep(''))
        }
    }, [errorStep])

    return {
        cartItems,
        totalQuantity,
        prices,
        loading,
        // shippingAddress
        handlePlaceOrder,
        scrollViewRef
    }

}
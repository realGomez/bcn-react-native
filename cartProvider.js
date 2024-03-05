import React, { useEffect, useMemo, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { setCartId, clearCartId, setTotalQuantity } from './redux/reducers/cart'
import { useSelector, useDispatch } from 'react-redux'
import { useAwaitQuery } from './hooks/useAwaitQuery';
import { saveStoreItemAsync, getStoreItemAsync } from './utils/secureStore';

const CartProvider = props => {
    const { children } = props;

    const { cartId } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const fetchCartDetails = useAwaitQuery(CART_DETAILS_QUERY);

    const { data } = useQuery(GET_ITEM_COUNT_QUERY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            cartId
        },
        skip: !cartId
    });

    console.log('cartId', cartId);

    useEffect(() => {

        if (data) {
            dispatch(setTotalQuantity(
                data.cart.total_quantity
            ))
        }

    }, [data])


    useEffect(() => {

        getCartDetails();


    }, [cartId])


    const getCartDetails = async function () {
        if (!cartId) {

            try {

                const retrieveCartId = await getStoreItemAsync('cartId');

                if (retrieveCartId) {
                    dispatch(setCartId(
                        retrieveCartId
                    ))
                    return
                }

                const { data: cartData, errors } = await fetchCartId({
                    fetchPolicy: 'no-cache'
                });

                if (errors) {
                    const receivePayload = new Error(errors);
                } else {
                    dispatch(setCartId(
                        cartData.cartId
                    ))

                    saveStoreItemAsync('cartId', cartData.cartId)
                }

            } catch (error) {

            }

        } else {

            try {
                const { data: cartData, errors } = await fetchCartDetails({
                    variables: { cartId },
                    fetchPolicy: 'network-only'
                });

                if (errors) {
                    const receivePayload = new Error(errors);
                } else {

                }

            } catch (error) {
                const { data: cartData, errors } = await fetchCartId({
                    fetchPolicy: 'no-cache'
                });

                if (errors) {
                    const receivePayload = new Error(errors);
                } else {
                    dispatch(setCartId(
                        cartData.cartId
                    ))
                    saveStoreItemAsync('cartId', cartData.cartId)
                }
            }
        }
    }




    return (
        null
    );
};

export default CartProvider;

const CREATE_CART_MUTATION = gql`
    mutation createCart {
        cartId: createEmptyCart
    }
`;

const CART_DETAILS_QUERY = gql`
    query checkUserIsAuthed($cartId: String!) {
        cart(cart_id: $cartId) {
            id

        }
    }
`;

const GET_ITEM_COUNT_QUERY = gql`
    query getItemCount($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;
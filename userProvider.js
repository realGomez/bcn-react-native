import React, { useEffect, useMemo, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { setUserInfo, clearToken, setToken } from './redux/reducers/user'
import { useSelector, useDispatch } from 'react-redux'
import { useAwaitQuery } from './hooks/useAwaitQuery';
import { saveStoreItemAsync, getStoreItemAsync } from './utils/secureStore';

const UserProvider = props => {
    const { children } = props;

    const { token } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const fetchUserDetails = useAwaitQuery(GET_CUSTOMER);

    // const { data } = useQuery(GET_CUSTOMER, {
    //     fetchPolicy: 'cache-and-network',
    //     nextFetchPolicy: 'cache-first',
    // });

    // console.log('cartId', cartId);

    // useEffect(() => {

    //     if (data) {
    //         dispatch(setTotalQuantity(
    //             data.cart.total_quantity
    //         ))
    //     }

    // }, [data])


    useEffect(() => {

        getUserDetails();


    }, [])


    const getUserDetails = async function () {
        if (!token) {

            try {

                const token = await getStoreItemAsync('token');

                if (token) {
                    const { data: userData, errors } = await fetchUserDetails({
                        fetchPolicy: 'network-only'
                    });

                    if (errors) {
                        saveStoreItemAsync('token', '')
                        dispatch(clearToken())
                    } else {
                        dispatch(setToken(
                            token
                        ))
                        dispatch(setUserInfo(userData.customer))
                        // saveStoreItemAsync('token', token)
                    }

                }


            } catch (error) {

            }

        } else {

            try {


                const { data: userData, errors } = await fetchUserDetails({
                    fetchPolicy: 'network-only'
                });

                if (errors) {
                    const receivePayload = new Error(errors);
                    dispatch(clearToken(
                        ''
                    ))
                    saveStoreItemAsync('token', '')
                } else {
                    dispatch(setUserInfo(userData.customer))
                }

            } catch (error) {

                dispatch(clearToken(
                    ''
                ))
                saveStoreItemAsync('token', '')


            }
        }
    }




    return (
        null
    );
};

export default UserProvider;

export const GET_CUSTOMER = gql`
    query checkUserIsAuthed {
        customer {
            id
            mobile_phone
            firstname
            lastname
            is_subscribed
            customer_id
            default_store_identifier
        }
    }
`;

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
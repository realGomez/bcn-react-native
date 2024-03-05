import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CART_DETAIL } from './cart.gql';
import { useEffect, useMemo, useState, useCallback } from 'react';
// import { setToken, setUserInfo } from '../../redux/reducers/cart'
import { useSelector, useDispatch } from 'react-redux'

export const usecart = props => {

    const { sku } = props;

    const { cartId } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const { data, error, loading } = useQuery(GET_CART_DETAIL, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        skip: !cartId,
        variables: { cart_id: cartId }

    });

    const cartItems = useMemo(() => {
        return (data && data.cart.items) || [];
    }, [data]);


    const totalQuantity = useMemo(() => {
        return (data && data.cart.total_quantity) || 0;
    }, [data]);

    const prices = useMemo(() => {
        return (data && data.cart.prices) || 0;
    }, [data]);


    return {
        cartItems,
        totalQuantity,
        prices,
        loading
    }

}
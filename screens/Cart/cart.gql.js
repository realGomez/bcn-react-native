import { gql } from '@apollo/client';
import { CartPageFragment } from './cartPageFragments.gql';

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        storeConfig {
            id
            product_url_suffix
        }
    }
`;

export const GET_CART_DETAIL = gql`
    query cart($cart_id:String!) {
        cart(cart_id: $cart_id) {
            id
            ...CartPageFragment
    }
}
${CartPageFragment}
`;



export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductsToCart($cartId:String! $cartItems:CartItemInput!) {
        addProductsToCart(
            cartId: $cartId
            cartItems: $cartItems
        ) {
            cart{
                items{
                    id
                }
            }

        }
    }
`
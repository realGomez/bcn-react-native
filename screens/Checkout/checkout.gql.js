import { gql } from '@apollo/client';
import { CartPageFragment } from '../Cart/cartPageFragments.gql';
import { ShippingMethodsCheckoutFragment } from '../../components/Checkout/Shipping/shippingMethodFragments.gql';
import { ShippingInformationFragment } from '../../components/Checkout/Shipping/shippingInformationFragments.gql';

export const GET_CART_DETAIL = gql`
    query cart($cart_id:String!) {
        cart(cart_id: $cart_id) {
            id
            ...CartPageFragment
            ...ShippingMethodsCheckoutFragment
            ...ShippingInformationFragment
    }
}
${CartPageFragment}
${ShippingInformationFragment}
${ShippingMethodsCheckoutFragment}
`;

export const CREATE_CART = gql`
    # This mutation will return a masked cart id. If a bearer token is provided for
    # a logged in user it will return the cart id for that user.
    mutation createCart {
        cartId: createEmptyCart
    }
`;

export const PLACE_ORDER = gql`
    mutation placeOrder($cartId: String!,$remark:String) {
        placeOrder(input: { cart_id: $cartId,remark:$remark}) @connection(key: "placeOrder") {
            order {
                order_number
            }
        }
    }
`;
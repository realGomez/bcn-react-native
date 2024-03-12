import { gql } from '@apollo/client';
import { ShippingInformationFragment } from './shippingInformationFragments.gql';
import { ShippingMethodsCheckoutFragment } from './shippingMethodFragments.gql';
import { PriceSummaryFragment } from '../../../screens/Cart/priceSummaryFragments.gql';
import { AvailablePaymentMethodsFragment } from '../Payment/paymentInformation.gql';


export const GET_CART_SHIPPING = gql`
    query cart($cart_id:String!) {
        cart(cart_id: $cart_id) {
            id
            shipping_addresses {
                available_shipping_methods {
                    amount {
                        currency
                        value
                    }
                    available
                    carrier_code
                    carrier_title
                    method_code
                    method_title
                }
                # selected_shipping_method {
                #     amount {
                #         currency
                #         value
                #     }
                # }
                selected_shipping_method {
                    amount {
                        currency
                        value
                    }
                    carrier_code
                    method_code
                    method_title
                }
                street
            }
    }
}
`;

export const SET_CUSTOMER_ADDRESS_ON_CART = gql`
    mutation SetCustomerAddressOnCart($input:SetShippingAddressesOnCartInput!) {
        setShippingAddressesOnCart(
            input: $input
        ) @connection(key: "setShippingAddressesOnCart") {
            cart {
                id
                ...ShippingInformationFragment
                ...ShippingMethodsCheckoutFragment
                ...PriceSummaryFragment
                ...AvailablePaymentMethodsFragment
            }
        }
    }
    ${ShippingInformationFragment}
    ${ShippingMethodsCheckoutFragment}
    ${PriceSummaryFragment}
    ${AvailablePaymentMethodsFragment}
`;

export const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethod(
        $cartId: String!
        $shippingMethod: ShippingMethodInput!
    ) {
        setShippingMethodsOnCart(
            input: { cart_id: $cartId, shipping_methods: [$shippingMethod] }
        ) @connection(key: "setShippingMethodsOnCart") {
            cart {
                id
                # If this mutation causes "free" to become available we need to know.
                available_payment_methods {
                    code
                    title
                }
                ...PriceSummaryFragment
                # We include the following fragments to avoid extra requeries
                # after this mutation completes. This all comes down to not
                # having ids for shipping address objects. With ids we could
                # merge results.
                ...ShippingInformationFragment
                ...ShippingMethodsCheckoutFragment
            }
        }
    }
    ${ShippingMethodsCheckoutFragment}
    ${PriceSummaryFragment}
    ${ShippingInformationFragment}
`;
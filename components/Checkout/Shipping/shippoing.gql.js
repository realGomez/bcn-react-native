import { gql } from '@apollo/client';
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
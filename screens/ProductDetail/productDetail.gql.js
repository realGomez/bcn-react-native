import { gql } from '@apollo/client';
import { CartPageFragment } from '../Cart/cartPageFragments.gql';
export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        storeConfig {
            id
            product_url_suffix
        }
    }
`;

export const GET_PRODUCT_DETAIL = gql`
    query products($skus:[String]) {
    products( filter:{sku:{in:$skus}} pageSize:1 ) {
            items {
                name
                description {
                    html
                }
                price {
                    minimalPrice {
                        amount {
                            currency
                            value
                        }
                    }
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
                }
                price_range {
                    minimum_price {
                        regular_price {
                            value
                            currency
                        }
                        final_price {
                            value
                            currency
                        }
                        discount {
                            amount_off
                            percent_off
                        }
                    }
                }
                sku
                short_description {
                    html
                }
                small_image {
                    disabled
                    label
                    position
                    url
                }
                uid
                url_key
                url_suffix
                ... on ConfigurableProduct {
                    configurable_options {
                        attribute_code
                        attribute_id
                        attribute_uid
                        id
                        label
                        position
                        product_id
                        uid
                        use_default
                        values {
                            default_label
                            label
                            store_label
                            uid
                            use_default_value
                            value_index
                        }
                    }
                    variants {
                        attributes {
                            code
                            value_index
                        }
                        product {
                            id
                           
                            sku
                            name
                            price {
                                regularPrice {
                                    amount {
                                        currency
                                        value
                                    }
                                }

                            }

                            price_range {
                                minimum_price {
                                    regular_price {
                                        value
                                        currency
                                    }
                                    final_price {
                                        value
                                        currency
                                    }
                                    discount {
                                        amount_off
                                        percent_off
                                    }
                                }
                            }


                        }
                    }
                }
                media_gallery {
                    disabled
                    label
                    position
                    url
                }
            }
        }
}

`;



export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductsToCart($cartId:String! $product:product!) {
        addProductsToCart(
            cartId: $cartId
            cartItems: [$product]
        ) {
            cart{
                id
            }

        }
    }
`

export const ADD_CONFIGURABLE_MUTATION = gql`
    mutation addConfigurableProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
        $parentSku: String!
    ) {
        addConfigurableProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [
                    {
                        data: { quantity: $quantity, sku: $sku }
                        parent_sku: $parentSku
                    }
                ]
            }
        ) @connection(key: "addConfigurableProductsToCart") {
            cart {
                id
                ...CartPageFragment
            }
        }
    }
    ${CartPageFragment}
`;

export const ADD_SIMPLE_MUTATION = gql`
    mutation addSimpleProductToCart(
        $cartId: String!
        $quantity: Float!
        $sku: String!
    ) {
        addSimpleProductsToCart(
            input: {
                cart_id: $cartId
                cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
            }
        ) @connection(key: "addSimpleProductsToCart") {
            cart {
                id
                ...CartPageFragment
            }
        }
    }
    ${CartPageFragment}
`;
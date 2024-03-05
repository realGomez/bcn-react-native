import { gql } from '@apollo/client';

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        storeConfig {
            id
            product_url_suffix
        }
    }
`;

export const GET_CATEGORIESE = gql`
    query products($uid:String! $pageSize:Int! $currentPage:Int!  $sort:ProductAttributeSortInput) {
    products(
        pageSize: $pageSize
        currentPage: $currentPage
        filter: { category_uid: { eq: $uid } }
        sort:$sort
    ) {
            items {
                description {
                    html
                }
                id
                name
                price {
                    minimalPrice {
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
                url_key
                small_image {
                    disabled
                    label
                    position
                    url
                }
                
            }
        }
}

`;


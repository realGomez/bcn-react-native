import { gql } from '@apollo/client';


export const GET_PRODUCTS_BY_SKU = gql`
    query getProductsBySku($skus:[String] $pageSize:Int!){
    products(filter:{sku:{in:$skus}} pageSize:$pageSize){
        items{
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


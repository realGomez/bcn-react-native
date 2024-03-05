import { gql } from '@apollo/client';

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        storeConfig {
            id
            product_url_suffix
        }
    }
`;

export const GET_CATEGORY_LIST = gql`
    query CategoryList {
    categoryList {
        include_in_menu
        name
        path
        url_path
        url_key
        url_suffix
        children {
            name
            path
            url_path
            url_key
            url_suffix
            include_in_menu
            image
            uid
            children {
                name
                path
                url_path
                url_key
                url_suffix
                include_in_menu
                image
                uid
            }
        }
    }
}
`;


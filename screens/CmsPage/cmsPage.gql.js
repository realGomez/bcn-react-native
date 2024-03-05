import { gql } from '@apollo/client';

export const GET_STORE_CONFIG_DATA = gql`
    query getStoreConfigData {
        storeConfig {
            id
            product_url_suffix
        }
    }
`;

export const GET_CMS_PAGE = gql`
    query cmsPage($id:Int!) {
    cmsPage(id:$id){
        url_key 
        content
        content_heading 
        title 
        page_layout 
        meta_title 
        meta_keywords 
        meta_description 
    }
    storeConfig{
        id 
        root_category_id 
    }

}
`;


// import I18n from '../../../i18n';
import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_PRODUCTS_BY_SKU } from './cmsProducts.gql';
import { useMemo } from 'react';


export const useCmsProducts = props => {

    const { attr, nodes } = props;

    const skus = useMemo(() => {
        if (attr['data-appearance'] == "carousel" && nodes.length > 0) {
            const skus = nodes[0]['nodes'].map((item) => {
                return item['nodes'][0]['nodes'][1]['nodes'][3] ? item['nodes'][0]['nodes'][1]['nodes'][3]['nodes'][0]['nodes'][0]['nodes'][0]['attr']['data-product-sku'] : item['nodes'][0]['nodes'][1]['nodes'][2]['nodes'][0]['nodes'][0]['nodes'][0]['attr']['data-product-sku'];

            })

            return skus;

        } else if (attr['data-appearance'] == "grid" && nodes.length > 0) {

            // items
            const skus = nodes[0]['nodes'][0]['nodes'][0]['nodes'][0]['nodes'].map((item) => {

                // 0 product-item-info-> 1 product-item-details-> [0-5]product-item-inner->  0 product-item-actions->0 actions-primary->0 tocart-form
                // return item['nodes'][0]['nodes'][1]['nodes'][5] ? item['nodes'][0]['nodes'][1]['nodes'][5]['nodes'][0]['nodes'][0]['nodes'][0]['attr']['data-product-sku'] : item['nodes'][0]['nodes'][1]['nodes'][4]['nodes'][0]['nodes'][0]['nodes'][0]['attr']['data-product-sku'];

                const itemDetailChilNodes = item['nodes'][0]['nodes'][1]['nodes'];

                const matchNode = itemDetailChilNodes.find(childNode => {
                    return childNode.classStr == "product-item-inner"
                })

                return matchNode ? matchNode['nodes'][0]['nodes'][0]['nodes'][0]['attr']['data-product-sku'] : '';

            })

            return skus;

        } else {
            return [];
        }


    }, [nodes, attr])


    const { error, loading, data } = useQuery(GET_PRODUCTS_BY_SKU, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            pageSize: skus.length,
            skus: skus
        },
        skip: skus.length == 0
    });


    const items = data && data.products && data.products.items ? data.products.items : [];


    return {
        items
    }

}
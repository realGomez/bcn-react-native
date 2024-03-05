import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CATEGORIESE } from './category.gql';
import { useMemo } from 'react';


export const useCategory = props => {

    const { uid } = props;

    const { error, loading, data } = useQuery(GET_CATEGORIESE, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            uid,
            pageSize: 10,
            currentPage: 1,
            sort: { relevance: "DESC" }
        }
    });




    const items = data && data.products && data.products.items ? data.products.items : [];

    console.log('products error', error);
    console.log('products items', items);



    return {
        items
    }

}
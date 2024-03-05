// import I18n from '../../../i18n';
import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CMS_PAGE } from './cmsPage.gql';
import { useCallback, useMemo, useState, useEffect } from 'react';


export const useCmsPage = props => {


    const { error, loading, data } = useQuery(GET_CMS_PAGE, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            id: 2
        }
    });


    const content = useMemo(() => {

        const htmlContent = data && data.cmsPage ? data.cmsPage.content : '';
        return htmlContent

    })


    return {
        content
    }

}
// import I18n from '../../../i18n';
import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CATEGORY_LIST } from './categoryTree.gql';
import { useCallback, useMemo, useState, useEffect } from 'react';


export const useCategoryTree = props => {

    const [activeCategory, setActiveCategory] = useState([]);
    const [activeCategoryUrlKey, setActiveCategoryUrlKey] = useState([]);

    const { error, loading, data } = useQuery(GET_CATEGORY_LIST, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });


    const category = useMemo(() => {
        const items = data && data.categoryList ? data.categoryList[0].children : null;

        if (items) {

            const filterItems = items.filter((item) => {
                return item.include_in_menu
            })

            // const dd = JSON.parse(JSON.stringify(filterItems));

            // dd.sort(function (itemA, itemB) {
            //     return itemA.position - itemB.position
            // })

            return filterItems;
        } else {
            return items
        }


    }, [data])


    useEffect(() => {
        if (category && category.length > 0) {
            setActiveCategory(category[0])
            setActiveCategoryUrlKey(category[0]['url_key'])
        }
    }, [category])

    const handlePress = useCallback((item) => {
        const { url_key, children } = item;
        setActiveCategory(item)
        setActiveCategoryUrlKey(url_key)
    }, [category])

    const subCategories = useMemo(() => {
        const { url_key, children=[] } = activeCategory;
        const filterItems = children.filter((item) => {
            return item.include_in_menu
        })
        return filterItems;
    }, [activeCategory])

    return {
        category,
        subCategories,
        activeCategoryUrlKey,
        activeCategory,
        handlePress
    }

}
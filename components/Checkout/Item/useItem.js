import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { deriveErrorMessage } from '../../../utils/deriveErrorMessage';
import configuredVariant from '../../../utils/configuredVariant';
import DEFAULT_OPERATIONS from './product.gql';
import { useSelector, useDispatch } from 'react-redux'


export const useItem = props => {
    const {
        item,
        setActiveEditItem,
        setIsCartUpdating,
    } = props;

    const { cartId } = useSelector((state) => state.cart)

    // const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        removeItemMutation,
        updateItemQuantityMutation,
        getConfigurableThumbnailSource
    } = DEFAULT_OPERATIONS;

    const { data: configurableThumbnailSourceData } = useQuery(
        getConfigurableThumbnailSource,
        {
            fetchPolicy: 'cache-and-network'
        }
    );

    const configurableThumbnailSource = useMemo(() => {
        if (configurableThumbnailSourceData) {
            return configurableThumbnailSourceData.storeConfig
                .configurable_thumbnail_source;
        }
    }, [configurableThumbnailSourceData]);

    const flatProduct = flattenProduct(item, configurableThumbnailSource);

    const { product } = item;

   

    const [displayError, setDisplayError] = useState(false);

    const derivedErrorMessage = useMemo(() => {
        return (
            (displayError &&
                deriveErrorMessage([updateError, removeItemError])) ||
            ''
        );
    }, [displayError]);


    const handleEditItem = useCallback(() => {
        setActiveEditItem(item);

        // If there were errors from removing/updating the product, hide them
        // when we open the modal.
        setDisplayError(false);
    }, [item, setActiveEditItem]);

   

    return {
        errorMessage: derivedErrorMessage,
        isEditable: !!flatProduct.options.length,
        product: flatProduct
    };
};

const flattenProduct = (item, configurableThumbnailSource) => {
    const {
        configurable_options: options = [],
        prices,
        product,
        quantity
    } = item;

    const configured_variant = configuredVariant(options, product);

    const { price } = prices;
    const { value: unitPrice, currency } = price;


    const {
        collection_name,
        name,
        sku,
        thumbnail,
        stock_status: stockStatus,
        url_key: urlKey,
        url_suffix: urlSuffix,
    } = product;
    const { url: image } =
        configurableThumbnailSource === 'itself' && configured_variant
            ? configured_variant.thumbnail
            : thumbnail;

    const selectedProductSku = configured_variant ? configured_variant.sku : sku;


    return {
        currency,
        image,
        sku: selectedProductSku,
        collection_name,
        name,
        options,
        quantity,
        stockStatus,
        unitPrice,
        urlKey,
        urlSuffix,
    };
};


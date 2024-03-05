import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_PRODUCT_DETAIL, ADD_PRODUCT_TO_CART, ADD_SIMPLE_MUTATION, ADD_CONFIGURABLE_MUTATION } from './productDetail.gql';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { findMatchingVariant } from '../../utils/findMatchingProductVariant';
import WxValidate from '../../utils/wxValidate';
import { useIntl } from 'react-intl';

const INITIAL_OPTION_CODES = new Map();
const INITIAL_OPTION_SELECTIONS = new Map();

isProductConfigurable = product => {
    return product.__typename === 'ConfigurableProduct';

}

const deriveOptionSelectionsFromProduct = product => {
    if (!product || !isProductConfigurable(product)) {
        return INITIAL_OPTION_SELECTIONS;
    }

    const initialOptionSelections = new Map();
    for (const { attribute_id } of product.configurable_options) {
        initialOptionSelections.set(attribute_id, undefined);
    }

    return initialOptionSelections;
};

const deriveOptionCodesFromProduct = product => {
    // If this is a simple product it has no option codes.
    if (!product || !isProductConfigurable(product)) {
        return INITIAL_OPTION_CODES;
    }

    // Initialize optionCodes based on the options of the product.
    const initialOptionCodes = new Map();
    for (const {
        attribute_id,
        attribute_code
    } of product.configurable_options) {
        initialOptionCodes.set(attribute_id, attribute_code);
    }

    return initialOptionCodes;
};

export const useProductDetail = props => {

    const { sku } = props;

    const { cartId } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const { formatMessage } = useIntl();
    const [errorList, setErrorList] = useState([]);

    const [runQuery, { error, loading, data }] = useLazyQuery(GET_PRODUCT_DETAIL, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'

    });

    console.log('data', data);

    // const [addProductsToCart, { error: addProductsToCartError, loading: addProductsToCartLoading }] = useMutation(ADD_PRODUCT_TO_CART)
    const [
        addConfigurableProductToCart,
        {
            error: errorAddingConfigurableProduct,
            loading: isAddConfigurableLoading
        }
    ] = useMutation(ADD_CONFIGURABLE_MUTATION);

    const [
        addSimpleProductToCart,
        { error: errorAddingSimpleProduct, loading: isAddSimpleLoading }
    ] = useMutation(ADD_SIMPLE_MUTATION);


    useEffect(() => {
        runQuery({
            variables: {
                skus: [sku]

            }
        })
    }, [sku, runQuery])


    const product = data && data.products && data.products.items ? data.products.items[0] : null;

    const derivedOptionSelections = useMemo(
        () => deriveOptionSelectionsFromProduct(product),
        [product]
    );

    const [optionSelections, setOptionSelections] = useState(
        derivedOptionSelections
    );

    const derivedOptionCodes = useMemo(
        () => deriveOptionCodesFromProduct(product),
        [product]
    );

    const [optionCodes, setOptionCodes] = useState(derivedOptionCodes);

    useEffect(() => {
        setOptionCodes(deriveOptionCodesFromProduct(product))
    }, [product])

    console.log('derivedOptionSelections', derivedOptionSelections);
    console.log('optionCodes', optionCodes);
    console.log('optionSelections', optionSelections);

    const handleSelectionChange = useCallback(
        (optionId, selection) => {

            console.log('selection', selection);

            // We must create a new Map here so that React knows that the value
            // of optionSelections has changed.
            const nextOptionSelections = new Map([...optionSelections]);
            nextOptionSelections.set(optionId, selection);
            setOptionSelections(nextOptionSelections);
        },
        [optionSelections]
    );



    const variants = useMemo(
        () => product ? product.variants : [],
        [product]
    );

    const selectedVariant = findMatchingVariant({
        variants,
        optionCodes,
        optionSelections
    });


    useEffect(() => {

        const rules = {

        }
        const messages = {

        }

        for (const [id, value] of optionCodes) {
            rules[id] = {
                required: true
            }

            messages[id] = {
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            }
        }

        initValidate = new WxValidate(rules, messages)
    }, [optionCodes])


    const handleAddProductToCart = useCallback(async () => {

        const formValues = {};

        for (const [id, value] of optionSelections) {
            formValues[id] = value
        }

        if (!initValidate.checkForm(formValues)) {
            setErrorList(initValidate.errorList)
            return false;
        } else {
            setErrorList([])
        }

        try {
            if (product.__typename === 'SimpleProduct') {
                await addSimpleProductToCart({
                    variables: {
                        cartId: cartId,
                        quantity: 1,
                        sku: product.sku
                    }
                });
            } else if (product.__typename === 'ConfigurableProduct') {
                await addConfigurableProductToCart({
                    variables: {
                        cartId: cartId,
                        parentSku: product.sku,
                        quantity: 1,
                        sku: selectedVariant.product.sku
                    }
                });
            }
        } catch (error) {

        }



    }, [
        addConfigurableProductToCart,
        cartId,
        product,
        selectedVariant,
        optionSelections
    ])



    return {
        product,
        optionSelections,
        optionCodes,
        handleSelectionChange,
        handleAddProductToCart,
        loading: isAddSimpleLoading || isAddConfigurableLoading,
        errorList
    }

}
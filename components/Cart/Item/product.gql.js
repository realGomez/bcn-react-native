import { gql } from '@apollo/client';
import { CartPageFragment } from '../../../screens/Cart/cartPageFragments.gql';

export const GET_CONFIGURABLE_THUMBNAIL_SOURCE = gql`
    query getConfigurableThumbnailSource {
        storeConfig {
            id
            configurable_thumbnail_source
        }
    }
`;


export const REMOVE_ITEM_MUTATION = gql`
    mutation removeItem($cartId: String!, $itemId: Int!) {
        removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $itemId })
            @connection(key: "removeItemFromCart") {
            cart {
                id
                ...CartPageFragment
            }
        }
    }
    ${CartPageFragment}
`;

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation updateItemQuantity(
        $cartId: String!
        $itemId: Int!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_id: $itemId, quantity: $quantity }]
            }
        ) @connection(key: "updateCartItems") {
            cart {
                id
            }
        }
    }
`;

export default {
    getConfigurableThumbnailSource: GET_CONFIGURABLE_THUMBNAIL_SOURCE,
    removeItemMutation: REMOVE_ITEM_MUTATION,
    updateItemQuantityMutation: UPDATE_QUANTITY_MUTATION

};

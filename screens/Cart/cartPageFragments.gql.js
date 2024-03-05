import { gql } from '@apollo/client';

import { GiftCardFragment } from './giftCardFragments.gql';
import { ProductListingFragment } from './productListingFragments.gql';
import { PriceSummaryFragment } from './priceSummaryFragments.gql';
import { AppliedCouponsFragment } from './couponCodeFragments.gql';

export const CartPageFragment = gql`
    fragment CartPageFragment on Cart {
        id
        total_quantity
        ...ProductListingFragment
        ...AppliedCouponsFragment
        ...GiftCardFragment
        ...PriceSummaryFragment
    }
    ${ProductListingFragment}
    ${AppliedCouponsFragment}
    ${GiftCardFragment}
    ${PriceSummaryFragment}
`;

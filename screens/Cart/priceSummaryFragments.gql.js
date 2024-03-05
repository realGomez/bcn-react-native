import { gql } from '@apollo/client';

import { DiscountSummaryFragment } from './discountSummary.gql';
import { GiftCardSummaryFragment } from './giftCardSummary.gql';
import { ShippingSummaryFragment } from './shippingSummary.gql';
import { TaxSummaryFragment } from './taxSummary.gql';

export const GrandTotalFragment = gql`
    fragment GrandTotalFragment on CartPrices {
        grand_total {
            currency
            value
        }
    }
`;

export const PriceSummaryFragment = gql`
    fragment PriceSummaryFragment on Cart {
        id
        items {
            id
            quantity
        }
        ...ShippingSummaryFragment
        prices {
            ...TaxSummaryFragment
            ...DiscountSummaryFragment
            ...GrandTotalFragment
        }
        ...GiftCardSummaryFragment
    }
    ${DiscountSummaryFragment}
    ${GiftCardSummaryFragment}
    ${GrandTotalFragment}
    ${ShippingSummaryFragment}
    ${TaxSummaryFragment}
`;

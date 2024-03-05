import { gql } from '@apollo/client';

export const GET_COUNTRY_QUERY = gql`
    query getCountries {
        countries {
            id
            two_letter_abbreviation
            three_letter_abbreviation
            full_name_locale
            full_name_english
            available_regions {
                id
                code
                name
            }
        }

    }
`;
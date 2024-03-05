import { gql } from '@apollo/client';

export const CustomerAddressFragment = gql`
    fragment CustomerAddressFragment on CustomerAddress {
        id
        city
        country_code
        firstname
        lastname
        postcode
        region {
            region
            region_code
            region_id
        }
        street
        telephone
        city_id
        county
        county_id
        default_billing
        default_shipping
    }
`;

export const AddressBookFragment = gql`
    fragment AddressBookFragment on Customer {
        id
        addresses {
            id
            ...CustomerAddressFragment
        }
    }
    ${CustomerAddressFragment}
`;


export const CREATE_CUSTOMER_ADDRESS_MUTATION = gql`
    mutation CreateCustomerAddress($address: CustomerAddressInput!) {
        createCustomerAddress(input: $address)
            @connection(key: "createCustomerAddress") {
            id
            ...CustomerAddressFragment
        }
    }
    ${CustomerAddressFragment}
`;

export const UPDATE_CUSTOMER_ADDRESS_MUTATION = gql`
    mutation UpdateCustomerAddress(
        $addressId: Int!
        $address: CustomerAddressInput!
    ) {
        updateCustomerAddress(id: $addressId, input: $address)
            @connection(key: "updateCustomerAddress") {
            id
            ...CustomerAddressFragment
        }
    }
    ${CustomerAddressFragment}
`;


export const GET_CUSTOMER_QUERY = gql`
    query GetCustomer {
        customer {
            id
            email
            firstname
            lastname
            mobile_phone
            addresses{
              id
              ...CustomerAddressFragment
            }
        }
    }
    ${CustomerAddressFragment}
`;
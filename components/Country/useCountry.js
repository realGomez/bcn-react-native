import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_COUNTRY_QUERY } from './country.gql';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { setShippingAddress, setEditAddress } from '../../redux/reducers/checkout'
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';

export const useCountry = props => {

    const { onChangeField } = props

    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')


    const { editAddress } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const { formatMessage } = useIntl();

    const { data, error, loading } = useQuery(GET_COUNTRY_QUERY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
    });



    const countries = useMemo(() => {
        return data && data.countries ? data.countries : []
    }, [data])

    const availableRegions = useMemo(() => {
        const match = countries.find(item => {
            return item.two_letter_abbreviation = country
        })

        return match ? match.available_regions : []

    }, [countries, country])


    useEffect(() => {

        if (editAddress) {
            setCountry(editAddress.country_code)
        }

    }, [editAddress])

    useEffect(() => {

        if (editAddress) {
            setRegion(editAddress.region.region_code)
        }

    }, [setRegion, availableRegions, editAddress])

    const handleCountryChange = useCallback((value) => {
        setCountry(value)
    }, [setCountry])

    const handleRegionChange = useCallback((value) => {

        setRegion(value)

        const match = availableRegions.find(item => {
            return item.code == value
        })

        onChangeField('region', match.name);
        onChangeField('region_code', value);

    }, [
        setRegion,
        onChangeField,
        availableRegions
    ])


    console.log('region region', region);
    console.log(' country', country);




    return {
        countries,
        country,
        handleCountryChange,
        availableRegions,
        region,
        handleRegionChange
    }

}
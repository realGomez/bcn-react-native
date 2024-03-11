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
        if (editAddress && countries.length) {
            setCountry(editAddress.country_code)
        }

    }, [editAddress, countries])

    useEffect(() => {

        if (editAddress && availableRegions.length) {
            const match = availableRegions.find(item => {
                return item.code == editAddress.region.region_code
            })

            if (match) {
                onChangeField('region', match.name);
                onChangeField('region_code', match.code);
                onChangeField('region_id', match.id);
                setRegion(match.code)

            }
        }

    }, [setRegion, availableRegions, editAddress])

    const handleCountryChange = useCallback((value) => {
        setCountry(value)

    }, [setCountry, countries])

    const handleRegionChange = useCallback((value) => {


        const match = availableRegions.find(item => {
            return item.code == value
        })

        console.log('match', match);

        if (match) {
            onChangeField('region', match.name);
            onChangeField('region_code', match.code);
            onChangeField('region_id', match.id);
            setRegion(match.code)
        }


    }, [
        setRegion,
        onChangeField,
        availableRegions
    ])


    console.log('editAddress', editAddress);
    // console.log('region region', region);

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
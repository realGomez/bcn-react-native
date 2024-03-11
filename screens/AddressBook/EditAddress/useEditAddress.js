import { useLazyQuery, useQuery, useMutation, InMemoryCache } from '@apollo/client';
import { GET_CUSTOMER_QUERY, CREATE_CUSTOMER_ADDRESS_MUTATION, UPDATE_CUSTOMER_ADDRESS_MUTATION } from '../addressBook.gql';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { setShippingAddress, setEditAddress } from '../../../redux/reducers/checkout'
import { useSelector, useDispatch } from 'react-redux'
import WxValidate from '../../../utils/wxValidate';
import { useIntl } from 'react-intl';

export const useEditAddress = props => {

    const { navigation } = props;

    const { editAddress } = useSelector((state) => state.checkout)
    const dispatch = useDispatch()

    const { formatMessage } = useIntl();
    const [formValues, setFormValues] = useState({});
    const [errorList, setErrorList] = useState([]);

    const [createAddress, { data, loading, error }] = useMutation(CREATE_CUSTOMER_ADDRESS_MUTATION, {
        onCompleted: res => {
            console.log('createAddress res', res)
        }
    })
    const [updateAddress, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_CUSTOMER_ADDRESS_MUTATION, {
        onCompleted: res => {
            console.log('updateAddress res', res)
            dispatch(setEditAddress(res.updateCustomerAddress))
        }
    })

    useEffect(() => {

        const rules = {
            firstname: {
                required: true
            },
            telephone: {
                required: true,
                tel: true,
            },
            country_code: {
                required: true
            },
            region: {
                required: true
            },
            city: {
                required: true
            },
            street: {
                required: true
            }

        }
        const messages = {
            telephone: {
                tel: formatMessage({ id: 'global.cnTel', defaultMessage: 'Enter 11 number' }),
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            },
            firstname: {
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            },
            country_code: {
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            },
            region: {
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            },
            city: {
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            },
            street: {
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            }
        }

        initValidate = new WxValidate(rules, messages)
    }, [])

    useEffect(() => {

        if (editAddress) {
            setFormValues({
                firstname: editAddress.firstname,
                telephone: editAddress.telephone,
                country_code: editAddress.country_code,
                region: editAddress.region.region,
                region_code: editAddress.region.region_code,
                city: editAddress.city,
                street: editAddress.street[0]
            })
        }

    }, [editAddress, setFormValues])

    const onChangeField = useCallback((name, value) => {
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value

        }))
    }, [setFormValues])

    const handleSubmit = useCallback(async () => {


        if (!initValidate.checkForm(formValues)) {
            setErrorList(initValidate.errorList)
            return false;
        } else {
            setErrorList([])
        }


        if (editAddress) {
            await updateAddress({
                variables: {
                    addressId: editAddress.id,
                    address: {
                        region: {
                            region: formValues.region,
                            region_code: formValues.region_code,
                            region_id: formValues.region_id
                        },
                        country_code: formValues.country_code,
                        street: [formValues.street],
                        telephone: formValues.telephone,
                        postcode: '000000',
                        city: formValues.city,
                        firstname: formValues.firstname,
                        lastname: 'Bak',
                        default_shipping: editAddress.default_shipping,
                        default_billing: editAddress.default_billing

                    }
                }
            })

            navigation.navigate('AddressBook', {
                shouldRefetch:true
            })
        } else {
            await createAddress({
                variables: {
                    address: {
                        region: {
                            region: formValues.region,
                            region_code: formValues.region_code,
                            region_id: formValues.region_id
                        },
                        country_code: formValues.country_code,
                        street: [formValues.street],
                        telephone: formValues.telephone,
                        postcode: '000000',
                        city: formValues.city,
                        firstname: formValues.firstname,
                        lastname: 'Bak',
                        default_shipping: false,
                        default_billing: false

                    }
                }
            })

            navigation.navigate('AddressBook', {
                shouldRefetch:true
            })
        }


    }, [
        formValues,
        editAddress,
        navigation
    ])

    const errors = useMemo(
        () =>
            new Map([
                ['createAddressError', error],
                ['updateError', updateError]

            ]),
        [error, updateError]
    );

    return {
        editAddress,
        onChangeField,
        loading: loading || updateLoading,
        errors,
        errorList,
        handleSubmit
    }

}
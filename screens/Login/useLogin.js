import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { SIGN_IN, GET_CUSTOMER, CREATE_CART, MERGE_CARTS, GET_CART_DETAILS_QUERY } from './login.gql';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { saveStoreItemAsync, getStoreItemAsync } from '../../utils/secureStore';
import { setToken, setUserInfo } from '../../redux/reducers/user'
import { setCartId, setCartInfo } from '../../redux/reducers/cart'
import { useSelector, useDispatch } from 'react-redux'
import { useAwaitQuery } from '../../hooks/useAwaitQuery';
import * as LocalAuthentication from 'expo-local-authentication'

import WxValidate from '../../utils/wxValidate';


let initValidate;


export const useLogin = props => {

    const { navigation } = props;

    const userInfo = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const { formatMessage } = useIntl();
    const [formValues, setFormValues] = useState({});
    const [errorList, setErrorList] = useState([]);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [fingerprint, setFingerprint] = useState(false);
    const [bioType, setBioType] = useState('');
    const [bioSaved, setBioSaved] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loginType, setLoginType] = useState('email');


    // Check if hardware supports biometrics


    const [fetchUserDetails, { data: userData, error: userError, loading: userLoging }] = useLazyQuery(GET_CUSTOMER, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        onCompleted(res) {
            console.log('userData', res);
            dispatch(setUserInfo(res.customer))
        }

    });

    const [fetchCartDetails, { data: cartData, error: cartError, loading: cartLoading }] = useLazyQuery(GET_CART_DETAILS_QUERY, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        onCompleted(res) {
            console.log('cartData', res);
            // dispatch(setUserInfo())
        }

    });

    const [signIn, { loading: signInLoading, error: signInError }] = useMutation(SIGN_IN)
    const [createEmptyCart, { loading: createEmptyCartLoading, error: createEmptyCartError }] = useMutation(CREATE_CART);
    const [mergeCarts] = useMutation(MERGE_CARTS);



    useEffect(() => {

        const rules = {
            email: {
                email: true,
                required: true
            },
            password: {
                required: true
            }
        }
        const messages = {
            email: {
                email: formatMessage({ id: 'global.enterEmail', defaultMessage: 'Enter Email' }),
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            },
            telephone: {
                tel: formatMessage({ id: 'global.cnTel', defaultMessage: 'Enter 11 number' }),
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            },
            password: {
                required: formatMessage({ id: 'global.required', defaultMessage: 'Required' })
            }
        }

        initValidate = new WxValidate(rules, messages)
    }, [])

    console.log('BioType', bioType);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);

            const enroll = await LocalAuthentication.isEnrolledAsync();
            console.log('enroll', enroll);
            if (enroll) {
                setFingerprint(true);
            }

            const type = await LocalAuthentication.supportedAuthenticationTypesAsync();
            console.log('type', type);

            let bioTypeStr = '';

            if (type) {

                if (type.includes(1) && type.includes(2)) {
                    setBioType('FINGERPRINT_FACIAL_RECOGNITION');
                    bioTypeStr = 'FINGERPRINT_FACIAL_RECOGNITION';
                } else if (type.includes(1)) {
                    setBioType('FINGERPRINT')
                    bioTypeStr = 'FINGERPRINT';
                } else if (type.includes(2)) {
                    setBioType('FACIAL_RECOGNITION')
                    bioTypeStr = 'FACIAL_RECOGNITION';
                } if (type.includes(3)) {
                    setBioType('IRIS') // 虹膜
                    bioTypeStr = 'IRIS';
                }
            }

            const bio_email = await getStoreItemAsync('bio_email');
            const bio_pw = await getStoreItemAsync('bio_pw');
            const bio_saved = await getStoreItemAsync('bio_saved');
            const bio_not_allowed = await getStoreItemAsync('bio_not_allowed');

            if (bio_saved && !bio_not_allowed) {
                setBioSaved(true)
                setLoginType('biometrics')
            }

            if (compatible && enroll && bio_email && bio_pw && bio_saved && !bio_not_allowed) {
                const biometricAuth = await LocalAuthentication.authenticateAsync({
                    promptMessage: formatMessage({ id: `global.loginWith_${bioTypeStr}`, defaultMessage: 'Login with {bioTypeStr}' }),
                    disableDeviceFallback: false,
                    cancelLabel: formatMessage({ id: 'login.cancel', defaultMessage: 'Cancel' }),
                });


                if (biometricAuth.success) {
                    console.log('biometricAuth success');
                    bioLogin(bio_email, bio_pw)
                }
            }

        })();
    }, []);

    const handleBiometricAuth = async () => {

        try {

            const bio_email = await getStoreItemAsync('bio_email');
            const bio_pw = await getStoreItemAsync('bio_pw');
            const bio_saved = await getStoreItemAsync('bio_saved');

            if (bio_email && bio_pw && bio_saved) {
                const biometricAuth = await LocalAuthentication.authenticateAsync({
                    promptMessage: formatMessage({ id: `global.loginWith_${bioType}`, defaultMessage: 'Login with {bioType}' }),
                    disableDeviceFallback: false,
                    cancelLabel: formatMessage({ id: 'login.fingerprintInvalid', defaultMessage: 'Fingerprint is invalid, please log in with password to re-verify.' }),
                });

                if (biometricAuth.success) {
                    console.log('biometricAuth success');
                    bioLogin(bio_email, bio_pw)
                }
            } else {
                alert(formatMessage({ id: 'login.cancel', defaultMessage: 'Cancel' }))
            }


        } catch (error) {
            console.log(error);
        }
    }


    const onChangeField = useCallback((name, value) => {
        console.log('name,value', name, value);
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value

        }))
    }, [setFormValues])


    const bioLogin = useCallback(async (email, password) => {
        const res = await signIn({
            variables: {
                email: email,
                password: password
            }
        })

        await saveStoreItemAsync('token', res.data.generateCustomerToken.token)
        dispatch(setToken(res.data.generateCustomerToken.token))

        await fetchUserDetails();

        const resCart = await createEmptyCart();
        const sourceCartId = resCart.data.cartId;

        await saveStoreItemAsync('cartId', sourceCartId)
        const destinationCartId = await getStoreItemAsync('cartId');

        dispatch(setCartId(sourceCartId))


        await fetchCartDetails();

    }, [initValidate, formValues, setToken])


    const handleSubmit = useCallback(async () => {


        if (!initValidate.checkForm(formValues)) {

            console.log('initValidate', initValidate.errorList);

            setErrorList(initValidate.errorList)
            return false;
        } else {
            setErrorList([])
        }

        try {

            const res = await signIn({
                variables: {
                    email: formValues.email,
                    password: formValues.password
                }
            })

            await saveStoreItemAsync('token', res.data.generateCustomerToken.token)
            dispatch(setToken(res.data.generateCustomerToken.token))

            await saveStoreItemAsync('bio_email', formValues.email)
            await saveStoreItemAsync('bio_pw', formValues.password)

            await fetchUserDetails();

            const resCart = await createEmptyCart();
            const sourceCartId = resCart.data.cartId;

            await saveStoreItemAsync('cartId', sourceCartId)
            const destinationCartId = await getStoreItemAsync('cartId');

            dispatch(setCartId(sourceCartId))


            await fetchCartDetails();

            console.log('sourceCartId', sourceCartId);
            console.log('destinationCartId', destinationCartId);

            const bio_not_allowed = await getStoreItemAsync('bio_not_allowed');

            console.log('bio_not_allowed', bio_not_allowed);


            if (bio_not_allowed) {
                navigation.navigate('Account', {

                });
            } else {
                setShowModal(true);
            }

            // Merge the guest cart into the customer cart.
            // await mergeCarts({
            //     variables: {
            //         destinationCartId,
            //         sourceCartId
            //     }
            // });
        } catch (error) {
            console.log('error 33', error);

        }



    }, [initValidate, formValues, setToken])


    const hanldeConfirm = useCallback(() => {
        setShowModal(false);
        navigation.navigate('BiometricsVerify', {

        });
    }, [])

    const handleCancel = useCallback(() => {
        setShowModal(false);
    }, [])

    const handleLoginTypeSwitch = useCallback((type) => {
        setLoginType(type);
    }, [])



    const errors = useMemo(
        () =>
            new Map([
                ['signInError', signInError],
                ['createEmptyCartError', createEmptyCartError]

            ]),
        [signInError, createEmptyCartError]
    );

    return {
        errors,
        loading: signInLoading || createEmptyCartLoading || userLoging || cartLoading,
        onChangeField,
        handleSubmit,
        errorList,
        isBiometricSupported,
        fingerprint,
        bioType,
        bioSaved,
        handleBiometricAuth,
        showModal,
        hanldeConfirm,
        handleCancel,
        loginType,
        handleLoginTypeSwitch
    }

}
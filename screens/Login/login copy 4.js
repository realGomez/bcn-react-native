import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TextInput, TouchableHighlight } from 'react-native';
import globalcss from '../../globalcss';
import { FormattedMessage, useIntl } from 'react-intl';
import Field from '../../components/Field/field';
import { useLogin } from './useLogin';
import FormError from '../../components/FormError/formError';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import * as LocalAuthentication from 'expo-local-authentication'

export default function Login(props) {

    const { route, navigation } = props;


    const { formatMessage } = useIntl();

    const talonsProps = useLogin({ navigation });

    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

    // Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });

    const handleBiometricAuth = async () => {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync({
            promptMessage: 'Login with Biometrics',
            disableDeviceFallback: true,
        });


        if (!savedBiometrics){

            console.log('Biometrics is savedBiometrics 1',savedBiometrics);
            // Alert.alert(
            //     'Biometric record not found',
            //     'Please verify your identity with your password',
            //     'OK',
            //     // () => fallBackToDefaultAuth()
            // );
        }else{
            console.log('Biometrics is savedBiometrics 2',savedBiometrics);
        }
    }

    // const isBiometricSupport = async () => {
    //     let { available, biometryType } =
    //         await ReactNativeBiometrics.isSensorAvailable();
    //     if (available && biometryType === ReactNativeBiometrics.Biometrics) {
    //         console.log('Biometrics is supported', biometryType);
    //     }
    // };
    // useEffect(() => {
    //     isBiometricSupport();
    // }, []);


    const {
        onChangeField,
        handleSubmit,
        errorList,
        errors,
        loading
    } = talonsProps;

    console.log('formErrors', errorList);

    return (
        <View style={styles.container}>
            {/* <Text>
                <FormattedMessage
                    id='global.login'
                    defaultMessage={'Login'}
                />
            </Text> */}


            <Field
                name='email'
                label={formatMessage({ id: 'global.email', defaultMessage: 'Email' })}
                placeholder={formatMessage({ id: 'global.enter', defaultMessage: 'Enter' })}
                onChangeField={onChangeField}
                formErrors={errorList}
            />
            <Field
                name='password'
                placeholder={formatMessage({ id: 'global.enter', defaultMessage: 'Enter' })}
                label={formatMessage({ id: 'global.password', defaultMessage: 'Enter' })}
                onChangeField={onChangeField}
                formErrors={errorList}

            />

            <FormError errors={Array.from(errors.values())}
            />

            <TouchableHighlight onPress={handleSubmit} disabled={loading} style={styles.touchableHighlight}>
                <View style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>
                        {formatMessage({
                            id: 'global.login',
                            defaultMessage: 'Login'
                        })}
                    </Text>
                </View>
            </TouchableHighlight>

            <Text> {isBiometricSupported ? 'Your device is compatible with Biometrics'
                : 'Face or Fingerprint scanner is available on this device'}
            </Text>

            <TouchableHighlight onPress={handleBiometricAuth} disabled={loading} style={styles.touchableHighlight}>
                <View style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>
                        {formatMessage({
                            id: 'global.finger',
                            defaultMessage: '指纹'
                        })}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        backgroundColor: '#ffffff',
        paddingTop: globalcss.indent_m,
        paddingBottom: globalcss.indent_l,
    },
    input: {
        ...globalcss.input
    },
    primaryButton: {
        ...globalcss.primaryButton,
    },
    primaryButtonText: {
        ...globalcss.primaryButtonText
    },
    touchableHighlight: {
        borderRadius: 6
    }
})
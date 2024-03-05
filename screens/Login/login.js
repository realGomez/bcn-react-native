import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TextInput, TouchableHighlight } from 'react-native';
import globalcss from '../../globalcss';
import { FormattedMessage, useIntl } from 'react-intl';
import Field from '../../components/Field/field';
import { useLogin } from './useLogin';
import FormError from '../../components/FormError/formError';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { AlertIOS } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export default function Login(props) {

    const { route, navigation } = props;

    const { formatMessage } = useIntl();

    const talonsProps = useLogin({ navigation });


    const fingerprint = async () => {

        // const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
        // console.log('rnBiometrics', rnBiometrics);
        // console.log('BiometryTypes', BiometryTypes);
        // const { biometryType } = await rnBiometrics.isSensorAvailable()

        // console.log('biometryType', biometryType);

        // if (biometryType === BiometryTypes.Biometrics) {
        //     //do something face id specific
        // }

        FingerprintScanner
        .authenticate({ title: 'Log in with Biometrics' })
        .then((res) => {
            console.log('res',res);
        });
    }

    const handleFacesDetected = (e) => {
        console.log('handleFacesDetected', e);
    }



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

            <TouchableHighlight onPress={fingerprint} disabled={loading} style={styles.touchableHighlight}>
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
        borderRadius: 6,
        marginBottom: 10
    }
})
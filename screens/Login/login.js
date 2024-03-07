import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TextInput, TouchableHighlight, Alert, Modal } from 'react-native';
import globalcss from '../../globalcss';
import { FormattedMessage, useIntl } from 'react-intl';
import Field from '../../components/Field/field';
import { useLogin } from './useLogin';
import FormError from '../../components/FormError/formError';
import ModalPopup from '../../components/ModalPopup/modalPopup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Login(props) {

    const { route, navigation } = props;


    const { formatMessage } = useIntl();

    const talonsProps = useLogin({ navigation });

    const {
        onChangeField,
        handleSubmit,
        errorList,
        errors,
        loading,
        isBiometricSupported,
        fingerprint,
        bioSaved,
        handleBiometricAuth,
        showModal,
        hanldeConfirm,
        handleCancel,
    } = talonsProps;

    console.log('formErrors', errorList);

    // Alert.alert('Alert',
    //     'Are you sure delete all notifications',
    //     [
    //         {
    //             text: 'OK',
    //             onPress: () => {
    //                 console.log('OK');
    //             }
    //         },
    //         {
    //             text: "Cancel",
    //             onPress: () => {
    //               console.log('Cancel');
    //             },
    //             style: "cancel"
    //         },
    //         {
    //             text: "Not again",
    //             onPress: () => {
    //               console.log('Not again');
    //             },
    //             style: "Not again"
    //         },
    //     ],
    //     {
    //         cancelable: true,
    //     })

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

            {/* <Text> {isBiometricSupported && fingerprint ? 'Your device is compatible with Biometrics'
                : 'Face or Fingerprint scanner is available on this device'}
            </Text> */}

            {isBiometricSupported && fingerprint && bioSaved ? <TouchableHighlight onPress={handleBiometricAuth} disabled={loading} style={styles.touchableHighlight}>
                <View style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>
                        {formatMessage({
                            id: 'global.finger',
                            defaultMessage: 'Login with Biometrics'
                        })}
                    </Text>
                </View>
            </TouchableHighlight> : ''}

            <ModalPopup
                showModal={showModal}
                hanldeConfirm={hanldeConfirm}
                handleCancel={handleCancel}
                confirmText={formatMessage({
                    id: 'login.biometricsLoginSetting',
                    defaultMessage: 'Biometrics Login Setting'
                })}
            >
                <View>
                    <Text style={styles.biometricsSettingTitle}><FormattedMessage id='login.biometricsSettingTitle' defaultMessage={'Try quick login'} /></Text>
                </View>
                <View style={styles.fingerprint}>
                    <MaterialIcons name='fingerprint' size={26} />
                </View>
            </ModalPopup>
        </View >
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
        marginBottom: globalcss.indent_m
    },
    biometricsSettingTitle: {
        marginBottom: globalcss.indent_m,
        textAlign: 'center'
    },
    fingerprint: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: globalcss.indent_m
    }
})
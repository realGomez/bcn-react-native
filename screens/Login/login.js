import React, { Fragment, useEffect, useState } from 'react';
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
        bioType,
        bioSaved,
        handleBiometricAuth,
        showModal,
        hanldeConfirm,
        handleCancel,
        loginType,
        handleLoginTypeSwitch,
        loginComplete,
        bioAccount
    } = talonsProps;

    console.log('formErrors', errorList);

    const emailLogin = (loginComplete ? <View>
        <View>
            <Text style={styles.biometricsSettingTitle}>{bioAccount}</Text>
        </View>
    </View> : <View>
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

        <View style={styles.toolbar}>
            <TouchableHighlight onPress={handleBiometricAuth} disabled={loading} style={styles.touchableHighlightSecondary}>
                <View style={styles.thirdButton}>
                    <Text style={styles.thirdButtonText}>
                        {formatMessage({
                            id: 'global.signUp',
                            defaultMessage: 'Sign Up'
                        })}
                    </Text>
                </View>
            </TouchableHighlight>
            {bioSaved ? <Fragment>
                <View style={styles.lineSplit}></View>
                <TouchableHighlight onPress={() => { handleLoginTypeSwitch('biometric') }} disabled={loading} style={styles.touchableHighlightSecondary}>
                    <View style={styles.thirdButton}>
                        <Text style={styles.thirdButtonText}>
                            {formatMessage({
                                id: `global.loginWith_${bioType}`,
                                defaultMessage: '{bioType}'
                            })}
                        </Text>
                    </View>
                </TouchableHighlight>
            </Fragment> : ''}


        </View>
    </View>)

    const bioLogin = (
        <View>
            <View>
                <Text style={styles.biometricsSettingTitle}>{bioAccount}</Text>
            </View>
            <TouchableHighlight onPress={handleBiometricAuth} disabled={loading} style={styles.fingerprint}>
                <View style={styles.fingerprintButton}>
                    <MaterialIcons name='fingerprint' size={26} color={'#245798'} />
                </View>
            </TouchableHighlight>
            <View>
                <Text style={styles.biometricsSettingTitle}><FormattedMessage id={`global.clickToVerify_${bioType}`} defaultMessage={'{bioType}'} /></Text>
            </View>

            <FormError errors={Array.from(errors.values())}
            />

            <View style={styles.toolbar}>
                <TouchableHighlight onPress={handleBiometricAuth} disabled={loading} style={styles.touchableHighlightSecondary}>
                    <View style={styles.thirdButton}>
                        <Text style={styles.thirdButtonText}>
                            {formatMessage({
                                id: 'global.signUp',
                                defaultMessage: 'Sign Up'
                            })}
                        </Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.lineSplit}></View>

                <TouchableHighlight onPress={() => { handleLoginTypeSwitch('email') }} disabled={loading} style={styles.touchableHighlightSecondary}>
                    <View style={styles.thirdButton}>
                        <Text style={styles.thirdButtonText}>
                            {formatMessage({
                                id: 'global.emailLogin',
                                defaultMessage: 'Login with Email'
                            })}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>

            {loginType == 'email' ? emailLogin : bioLogin}


            {/* <Text> {isBiometricSupported && fingerprint ? 'Your device is compatible with Biometrics'
                : 'Face or Fingerprint scanner is available on this device'}
            </Text> */}

            {/* {isBiometricSupported && fingerprint && bioSaved ? <TouchableHighlight onPress={handleBiometricAuth} disabled={loading} style={styles.touchableHighlight}>
                <View style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>
                        {formatMessage({
                            id: 'global.finger',
                            defaultMessage: 'Login with Biometrics'
                        })}
                    </Text>
                </View>
            </TouchableHighlight> : ''} */}

            <ModalPopup
                showModal={showModal}
                // showModal={true}

                hanldeConfirm={hanldeConfirm}
                handleCancel={handleCancel}
                confirmText={formatMessage({
                    id: `login.loginSetting_${bioType}`,
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
    },
    fingerprintButton: {
        borderWidth: 1,
        borderColor: '#245798',
        padding: 4,
        backgroundColor: '#ffffff'
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: '#245798'
    },
    thirdButton: {
        backgroundColor: '#ffffff',
    },
    thirdButtonText: {
        textAlign: 'center',
        color: '#245798'

    },
    touchableHighlightSecondary: {
        //   flexGrow:1,
        width: '50%'
    },
    lineSplit: {
        width: 1,
        backgroundColor: '#245798'
    }
})
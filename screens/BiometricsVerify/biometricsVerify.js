import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { number, string, shape } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { View, Button, Text, Image, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import IntlPatches from '../../utils/intlPatches';
import AntDesign from 'react-native-vector-icons/AntDesign';
import globalcss from '../../globalcss';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { saveStoreItemAsync, getStoreItemAsync } from '../../utils/secureStore';
import * as LocalAuthentication from 'expo-local-authentication'


const BiometricsVerify = props => {
    const { locale, formatMessage } = useIntl();
    const {

    } = props;

    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [fingerprint, setFingerprint] = useState(false);
    const [bioType, setBioType] = useState(false);
    const [biometricsEnable, setBiometricsEnable] = useState(false)


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
            // const bio_not_allowed = await getStoreItemAsync('bio_not_allowed');

            console.log('bio_saved', bio_saved);

            if (bio_email && bio_pw && bio_saved) {
                setBiometricsEnable(true)
            }

        })();
    }, []);

    const hanldeStoreSwitch = useCallback(async () => {
        const bio_email = await getStoreItemAsync('bio_email');
        const bio_pw = await getStoreItemAsync('bio_pw');
        const bio_saved = await getStoreItemAsync('bio_saved');

        if (bio_email && bio_pw && !bio_saved) {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: formatMessage({ id: `global.loginWith_${bioType}`, defaultMessage: 'Login with {bioTypeStr}' }),
                disableDeviceFallback: false,
                cancelLabel: formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' }),
            });

            if (biometricAuth.success) {
                console.log('biometricAuth success');
                await saveStoreItemAsync('bio_saved', '1')
                setBiometricsEnable(true)
            } else {
                Alert.alert('',
                    formatMessage({ id: `global.invalid_${bioType}`, defaultMessage: 'Invalid {bioType}' }),
                    [
                        {
                            text: formatMessage({ id: `global.confirm`, defaultMessage: 'OK' }),
                            // onPress: () => {
                            // }
                        },

                    ],
                    {
                        cancelable: false,
                    }
                );
                await saveStoreItemAsync('bio_saved', '')
                setBiometricsEnable(false)
            }

        } else {
            Alert.alert('',
                formatMessage({ id: `global.invalid_${bioType}`, defaultMessage: 'Invalid {bioType}' }),
                [
                    {
                        text: formatMessage({ id: `global.confirm`, defaultMessage: 'OK' }),
                        // onPress: () => {
                        // }
                    },

                ],
                {
                    cancelable: false,
                }
            );
            await saveStoreItemAsync('bio_saved', '')
            setBiometricsEnable(false)
        }
    }, [bioType])


    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={hanldeStoreSwitch}>
                <View style={styles.item}>
                    <Text><FormattedMessage id='biometricsVerify.loginWithBiometrics' defaultMessage={'Login with Biometrics'} /></Text>
                    {biometricsEnable ? <Fontisto name="checkbox-active" size={12} /> : <Fontisto name="checkbox-passive" size={12} />}
                </View>

            </TouchableHighlight>
        </View>
    );
};

BiometricsVerify.propTypes = {
};

BiometricsVerify.defaultProps = {
    classes: {}
};

export default BiometricsVerify;

const styles = StyleSheet.create({
    container: {
        paddingTop: globalcss.indent_s,
        paddingBottom: globalcss.indent_s,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        // backgroundColor: '#ffffff',
        borderRadius: 5
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: globalcss.indent_s,
        paddingBottom: globalcss.indent_s,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#efefef',
        backgroundColor: '#ffffff',

    }
})
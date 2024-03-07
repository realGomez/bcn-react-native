import React, { Fragment, useState, useEffect, useCallback } from 'react';
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
                promptMessage: formatMessage({ id: 'login.loginWithBiometrics', defaultMessage: 'Login with Biometrics' }),
                disableDeviceFallback: false,
                cancelLabel: formatMessage({ id: 'login.fingerprintInvalid', defaultMessage: 'Fingerprint is invalid, please log in with password to re-verify.' }),
            });

            if (biometricAuth.success) {
                console.log('biometricAuth success');
                await saveStoreItemAsync('bio_saved', '1')
                setBiometricsEnable(true)
            }
        } else {
            // await saveStoreItemAsync('bio_email', '')
            // await saveStoreItemAsync('bio_pw', '')
            await saveStoreItemAsync('bio_saved', '')
            setBiometricsEnable(false)
        }
    }, [])


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
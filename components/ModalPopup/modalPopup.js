import React, { Fragment } from 'react';
import { number, string, shape } from 'prop-types';
import { useIntl } from 'react-intl';
import { View, Button, Text, Image, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import IntlPatches from '../../utils/intlPatches';
import AntDesign from 'react-native-vector-icons/AntDesign';

import globalcss from '../../globalcss';


const ModalPopup = props => {
    const { locale, formatMessage } = useIntl();
    const {
        showModal,
        hanldeConfirm,
        handleCancel,
        children,
        confirmText = formatMessage({ id: 'modal.confirm', defaultMessage: 'Confirm' }),
        cancelText= formatMessage({ id: 'modal.cancel', defaultMessage: 'Cancel' }),
    } = props;



    return (<Modal
        animationType={'slide'}
        visible={showModal}
        transparent={true}
        onRequestClose={() => {console.log('onRequestClose'); }}>
        <View style={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View>{children}</View>
                    <View>
                        <TouchableHighlight onPress={hanldeConfirm}>
                            <View style={styles.primaryButton}>
                                <Text style={styles.primaryButtonText}>
                                    {confirmText}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View>
                        <TouchableHighlight onPress={handleCancel}>
                            <View style={styles.secondaryButton}>
                                <Text style={styles.secondaryButtonText}>
                                    {cancelText}
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.toolbar}>
                    <AntDesign name='closecircleo' size={26} color={'#ffffff'} />
                </View>
            </View>
        </View>

    </Modal>);
};

ModalPopup.propTypes = {
};

ModalPopup.defaultProps = {
    classes: {}
};

export default ModalPopup;

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
    },
    container: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%'

    },
    content: {
        backgroundColor: '#ffffff',
        paddingTop: globalcss.indent_l,
        paddingLeft: globalcss.indent_m,
        paddingRight: globalcss.indent_m,
        paddingBottom: globalcss.indent_l,
        borderRadius: 6,
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
    toolbar: {
        marginTop: globalcss.indent_m,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    secondaryButton:{
        ...globalcss.secondaryButton,
    },
    secondaryButtonText: {
        ...globalcss.secondaryButtonText
    }
})
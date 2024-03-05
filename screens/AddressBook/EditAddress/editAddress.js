import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import globalcss from '../../../globalcss';
import { useEditAddress } from './useEditAddress';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Field from '../../../components/Field/field';
import { FormattedMessage, useIntl } from 'react-intl';
import Country from '../../../components/Country/country';
import FormError from '../../../components/FormError/formError';

export default function EditAddress(props) {

    const { route, navigation } = props;

    const {
        editAddress,
        // shippingAddress,
        onChangeField,
        errorList,
        errors,
        handleSubmit,
        loading
    } = useEditAddress({})

    const { formatMessage } = useIntl();


    return (
        <View style={styles.container}>
            <ScrollView>
                <Field
                    name='firstname'
                    label={formatMessage({ id: 'global.firstname', defaultMessage: 'Firstname' })}
                    placeholder={formatMessage({ id: 'global.enter', defaultMessage: 'Enter' })}
                    onChangeField={onChangeField}
                    formErrors={errorList}
                    defaultValue={editAddress ? editAddress.firstname : ''}

                />

                <Field
                    name='telephone'
                    label={formatMessage({ id: 'global.telephone', defaultMessage: 'Telephone' })}
                    placeholder={formatMessage({ id: 'global.enter', defaultMessage: 'Enter' })}
                    onChangeField={onChangeField}
                    formErrors={errorList}
                    defaultValue={editAddress ? editAddress.telephone : ''}
                />

                <Country
                    onChangeField={onChangeField}
                    formErrors={errorList}
                />

                <Field
                    name='city'
                    label={formatMessage({ id: 'global.city', defaultMessage: 'City' })}
                    placeholder={formatMessage({ id: 'global.enter', defaultMessage: 'Enter' })}
                    onChangeField={onChangeField}
                    formErrors={errorList}
                    defaultValue={editAddress ? editAddress.city : ''}
                />

                <Field
                    name='street'
                    label={formatMessage({ id: 'global.street', defaultMessage: 'Street' })}
                    placeholder={formatMessage({ id: 'global.enter', defaultMessage: 'Enter' })}
                    onChangeField={onChangeField}
                    formErrors={errorList}
                    defaultValue={editAddress ? editAddress.street[0] : ''}
                />
                <FormError errors={Array.from(errors.values())}
                />
                <TouchableHighlight onPress={handleSubmit} disabled={loading} style={styles.touchableHighlight}>
                    <View style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>
                            {formatMessage({
                                id: 'global.save',
                                defaultMessage: 'Save'
                            })}
                        </Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        backgroundColor: '#ffffff',
        paddingTop: globalcss.indent_m,
        paddingBottom: globalcss.indent_l,
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: globalcss.indent_s,
        borderRadius: 5,
        alignItems: 'center'
    },
    edit: {
        width: 24
    },
    text: {
        flexGrow: 1
    },
    primaryButton: {
        ...globalcss.primaryButton,
    },
    primaryButtonText: {
        ...globalcss.primaryButtonText
    },
    touchableHighlight: {
        borderRadius: 6,
        marginBottom: 20,
        marginTop: 20
    }
})
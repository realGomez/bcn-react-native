import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import globalcss from '../../globalcss';
import { useAddressBook } from './useAddressBook';
import { FormattedMessage, useIntl } from 'react-intl';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function Cart(props) {

    const { route, navigation } = props;

    const { shouldRefetch } = route.params;

    const { formatMessage } = useIntl();

    const {
        addresses,
        shippingAddress,
        handleEditAddress,
        handleSelectShippingAddress
    } = useAddressBook({
        navigation,
        shouldRefetch
    })


    const addressHtml = addresses.map((address) => {
        return <View key={address.id} style={styles.item}>
            <TouchableHighlight style={styles.selectButton} onPress={() => { handleSelectShippingAddress(address) }}>
                <View style={styles.selectArea}>
                    <View style={styles.edit}>
                        {shippingAddress && shippingAddress.id == address.id ? <Fontisto name="checkbox-active" size={16} /> : <Fontisto name="checkbox-passive" size={16} />}
                    </View>
                    <View style={styles.text}>
                        <Text>{address.firstname}, {address.telephone},</Text>
                        <Text>{address.street[0]} {address.city} {address.region.region} {address.country_code}</Text>
                    </View>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.edit} onPress={() => { handleEditAddress(address) }}>
                <View style={styles.editIcon}>
                    <AntDesign name="edit" size={16} />
                </View>

            </TouchableHighlight>

        </View>
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                {addressHtml}
                <TouchableHighlight onPress={() => { handleEditAddress(null) }} style={styles.touchableHighlight}>
                    <View style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>
                            {formatMessage({
                                id: 'global.addNewAddress',
                                defaultMessage: 'Add New Address'
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
        paddingTop: globalcss.indent_s,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,

    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: globalcss.indent_s,
        borderRadius: 5,
        alignItems: 'center'
    },
    selectButton: {
        flexGrow: 1,
    },
    selectArea: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    edit: {
        width: 24,


    },
    editIcon: {
        backgroundColor: '#ffffff'
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
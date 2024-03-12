import React from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable, TouchableHighlight } from 'react-native';
import Price from '../../../components/Price'
import globalcss from '../../../globalcss';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FormError from '../../../components/FormError/formError';

import { useShipping } from './useShipping';
import { FormattedMessage } from 'react-intl';

export default function Shipping(props) {

    const {
        navigation,
    } = props;


    const talonProps = useShipping({})

    const {
        errors,
        shippingAddress,
        availableShippingMethods,
        selectedShippingMethod,
        hanldeSelectedShippingMethod
    } = talonProps;


    const shippingMethods = availableShippingMethods.map(item => {
        return (
            <TouchableHighlight key={item.carrier_code}
                onPress={() => hanldeSelectedShippingMethod(item.carrier_code)}
            >
                <View style={styles.item}>
                    <Text>{item.method_title}</Text>
                    {selectedShippingMethod.carrier_code == item.carrier_code ? <Fontisto name="radio-btn-active" size={12} /> : <Fontisto name="radio-btn-passive" size={12} />}
                </View>
            </TouchableHighlight>
        )
    })


    return (
        <View>
            <View style={styles.shippingAddress}>

                {shippingAddress ? <View>
                    <TouchableHighlight onPress={() => {
                        navigation.navigate('AddressBook', {

                        })
                    }}>
                        <View style={styles.link}>
                            <EvilIcons name="location" color={'#000000'} size={26} />
                            <View style={styles.text}>
                                <Text>{shippingAddress.firstname}, {shippingAddress.telephone},</Text>
                                <Text>{shippingAddress.street[0]} {shippingAddress.city} {shippingAddress.region.region} {shippingAddress.country_code}</Text>
                            </View>
                            <AntDesign name="right" color={'#000000'} size={16} />
                        </View>
                    </TouchableHighlight>
                </View> : <View>
                    <TouchableHighlight onPress={() => {
                        navigation.navigate('AddressBook', {

                        })
                    }}>
                        <View style={styles.link}>
                            <Text style={styles.text}>
                                <FormattedMessage
                                    id={'checkout.shippingAddress'}
                                    defaultMessage={'Shipping address'}
                                />
                            </Text>
                            <AntDesign name="right" color={'#000000'} size={16} />
                        </View>
                    </TouchableHighlight>
                </View>}
            </View>

            <FormError errors={Array.from(errors.values())}
            />


            <View style={styles.shippingMethods}>
                <View style={styles.text}>
                    <Text style={styles.shippingTitleText}><FormattedMessage
                        id={'checkout.shippingMethod'}
                        defaultMessage={'hipping Method'}
                    /></Text>
                </View>
                {shippingMethods}
            </View>
        </View>

    )

}

const styles = StyleSheet.create({
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        //  paddingLeft: globalcss.indent_m,
        // paddingRight: globalcss.indent_m,
        // padding: globalcss.indent_s,
        // marginBottom: globalcss.indent_s,
    },
    text: {
        marginRight: 'auto',
        flexGrow: 1
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: globalcss.indent_s,
        paddingTop: globalcss.indent_s,
        paddingBottom: globalcss.indent_s,
        // paddingLeft: globalcss.indent_s,
        // paddingRight: globalcss.indent_s,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#efefef'

    },
    shippingMethods: {
        padding: globalcss.indent_s,
        marginTop: globalcss.indent_m,
    },
    shippingTitleText: {
        fontWeight: 'bold'

    }

})
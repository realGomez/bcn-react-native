import React from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable, TouchableHighlight } from 'react-native';
import Price from '../../../components/Price'
import globalcss from '../../../globalcss';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { usePayment } from './usePayment';
import { FormattedMessage } from 'react-intl';
import FormError from '../../../components/FormError/formError';

export default function Payment(props) {

    const {
        navigation,
    } = props;


    const talonProps = usePayment({})

    const {
        errors,
        errorList,
        availablePaymentMethods,
        selectedPaymentMethod,
        hanldeSelectedPaymentMethod
    } = talonProps;

    const errorPaymentMethod = errorList.find(item => {
        return item.param == 'paymentMethod'
    })

    const paymentMethods = availablePaymentMethods.map(item => {
        return (
            <TouchableHighlight key={item.code}
                onPress={() => hanldeSelectedPaymentMethod(item.code)}
            >
                <View style={styles.item}>
                    <Text>{item.title}</Text>
                    {selectedPaymentMethod.code == item.code ? <Fontisto name="radio-btn-active" size={12} /> : <Fontisto name="radio-btn-passive" size={12} />}
                </View>
            </TouchableHighlight>
        )
    })


    return (
        <View>
            <View style={styles.shippingMethods}>
                <View style={styles.text}>
                    <Text style={styles.shippingTitleText}><FormattedMessage
                        id={'checkout.paymenMethod'}
                        defaultMessage={'Paymen Method'}
                    /></Text>
                </View>
                {paymentMethods}
                <FormError errors={Array.from(errors.values())}
                />
                {errorPaymentMethod ? <View style={styles.error}>
                    <Text style={styles.errorText}>{errorPaymentMethod.msg}</Text>
                </View> : ''}
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
        // padding: globalcss.indent_s,
    },
    shippingTitleText: {
        fontWeight: 'bold'

    },
    error: {
        marginTop: 4
    },
    errorText: {
        ...globalcss.error
    }

})
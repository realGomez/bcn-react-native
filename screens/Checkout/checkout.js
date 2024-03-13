import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import globalcss from '../../globalcss';
import { useCheckout } from './useCheckout';
import Item from '../../components/Checkout/Item/item';
import Shipping from '../../components/Checkout/Shipping/shipping';
import Payment from '../../components/Checkout/Payment/payment';


import PriceSummary from '../../components/Cart/PriceSummary/priceSummary';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Checkout(props) {

    const { route, navigation } = props;

    const {
        loading,
        cartItems,
        totalQuantity,
        prices,
        handlePlaceOrder,
        scrollViewRef
    } = useCheckout({ navigation })


    const itemsHtml = cartItems.map(item => <Item key={item.id} item={item} navigation={navigation} />)


    if (totalQuantity == 0) {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text>
                        <FormattedMessage
                            id='cart.totalItems'
                            defaultMessage={'{totalQuantity}件商品'}
                            values={{
                                totalQuantity: totalQuantity
                            }}
                        />
                    </Text>
                </View>
            </View>
        )
    }


    return (
        <ScrollView ref={scrollViewRef}>
            <View style={styles.container}>

                <View style={styles.title}>
                    <Text>
                        <FormattedMessage
                            id='cart.totalItems'
                            defaultMessage={'{totalQuantity}件商品'}
                            values={{
                                totalQuantity: totalQuantity
                            }}
                        />
                    </Text>
                </View>

                <View style={styles.section}>
                    <Shipping navigation={navigation} />
                </View>

                <View style={styles.section}>
                    <Payment navigation={navigation} />
                </View>

                <View style={styles.section}>
                    {itemsHtml}
                </View>
                <View style={styles.section}>
                    <PriceSummary prices={prices} />
                </View>

                <View style={styles.toolbar}>
                    <TouchableHighlight
                        onPress={handlePlaceOrder}
                        style={styles.touchableHighlight}
                    >
                        <View style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>
                                <FormattedMessage id='checkout.pay' defaultMessage={'Pay'} />
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: globalcss.indent_s,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,

    },
    title: {
        marginBottom: globalcss.indent_s
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingTop: globalcss.indent_m,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        paddingBottom: globalcss.indent_m,
        marginBottom: globalcss.indent_s,

    },
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
    toolbar: {
        marginTop: 20
    },
    primaryButton: {
        ...globalcss.primaryButton,
    },
    primaryButtonText: {
        ...globalcss.primaryButtonText
    },
    touchableHighlight: {
        borderRadius: 6,
        marginBottom: 20

    }
})
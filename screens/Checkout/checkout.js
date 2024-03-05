import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import globalcss from '../../globalcss';
import { useCheckout } from './useCheckout';
import Item from '../../components/Checkout/Item/item';
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
        shippingAddress
    } = useCheckout({})


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
        <View style={styles.container}>
            <ScrollView>
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
                    {shippingAddress ? <View>
                        <TouchableHighlight onPress={() => {
                            navigation.navigate('AddressBook', {

                            })
                        }}>
                            <View style={styles.link}>
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

                {itemsHtml}

                <View style={styles.section}>
                    <PriceSummary prices={prices} />
                </View>
                <TouchableHighlight
                    // onPress={handleSubmit} 
                    style={styles.touchableHighlight}
                >
                    <View style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>
                            <FormattedMessage id='checkout.pay' defaultMessage={'Pay'} />
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
    primaryButton: {
        ...globalcss.primaryButton,
        marginTop: 20
    },
    primaryButtonText: {
        ...globalcss.primaryButtonText
    },
    touchableHighlight: {
        borderRadius: 6,
        marginBottom: 20

    }
})
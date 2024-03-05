import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import globalcss from '../../globalcss';
import { usecart } from './useCart';
import Item from '../../components/Cart/Item/item';
import PriceSummary from '../../components/Cart/PriceSummary/priceSummary';
import { FormattedMessage } from 'react-intl';


export default function Cart(props) {

    const { route, navigation } = props;

    const {
        loading,
        cartItems,
        totalQuantity,
        prices
    } = usecart({})


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

                {itemsHtml}

                <View style={styles.section}>
                    <PriceSummary prices={prices} />
                </View>
                <TouchableHighlight
                    // onPress={handleSubmit} 
                    onPress={() => {
                        navigation.navigate('Checkout', { })
                    }}
                    style={styles.touchableHighlight}
                >
                    <View style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>
                            <FormattedMessage id='cart.checkout' defaultMessage={'Checkout'} />
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
        marginRight: 'auto'
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
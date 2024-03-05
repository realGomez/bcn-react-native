import React from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable, TouchableHighlight } from 'react-native';
import Price from '../../../components/Price'
import globalcss from '../../../globalcss';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useItem } from './useItem';
import { FormattedMessage } from 'react-intl';
import ProductOptions from '../ProductOptions/productOptions'

export default function Item(props) {

    const {
        navigation,
        item
    } = props;

    const { quantity } = item;

    const talonProps = useItem({ item })

    const {
        product,
        handleRemoveFromCart,
        removeItemLoading
    } = talonProps;

    const {
        currency,
        image,
        collection_name,
        name,
        sku,
        options,
        stockStatus,
        unitPrice,
        urlKey,
    } = product;


    return (
        <View style={styles.item}>
            <View style={styles.image}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('ProductDetail', {
                            url_key: item.product.url_key,
                            uid: item.product.id,
                            sku: item.product.sku

                        });
                    }}
                >
                    <View>
                        <Image resizeMethod='auto' style={{ width: 150, height: 150 }} source={{ uri: item.product.thumbnail.url }} />
                    </View>
                </Pressable>
            </View>

            <View style={styles.itemDetail}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('ProductDetail', {
                            url_key: item.product.url_key,
                            uid: item.product.id,
                            sku: item.product.sku

                        });
                    }}
                >
                    <View style={styles.name}>
                        <Text numberOfLines={1} >{item.product.name}</Text>
                    </View>
                </Pressable>
                <ProductOptions options={options} />

                <View style={styles.detailBottom}>
                    <View>
                        <View style={styles.option}>
                            <Text><FormattedMessage id='cartItem.quantity' defaultMessage={'Quantity'} /></Text>
                            <Text style={styles.name}>: {quantity}</Text>
                        </View>
                        <View>
                            <Price value={item.product.price.minimalPrice.amount.value} currency={item.product.price.minimalPrice.amount.currency} />
                        </View>
                    </View>

                    <TouchableHighlight
                        onPress={() => { handleRemoveFromCart(item.id) }}
                        disabled={removeItemLoading}
                    >
                        <AntDesign name="delete" size={14} />
                    </TouchableHighlight>


                </View>


            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginBottom: 10,
        borderRadius: 5

    },
    image: {
        width: 150,
        padding: 10,
    },
    itemDetail: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        flexGrow: 1
    },
    detailBottom: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    name: {

    },
    option: {
        flexDirection: 'row'
    }
})
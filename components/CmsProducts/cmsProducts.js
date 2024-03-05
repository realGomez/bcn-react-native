import React from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Price from '../../components/Price'


import { useCmsProducts } from './useCmsProducts'

export default function CmsProducts(props) {

    const {
        attr,
        nodes,
        images,
        imageUrls,
        videos,
        videoUrls,
        route,
        navigation
    } = props;

    const { items } = useCmsProducts({
        attr,
        nodes
    });



    return (
        <View style={styles.items}>
            {items.map(item => {
                return <View style={styles.item} key={item.id}>
                    <Pressable
                        // onPress={() => { handlePress(item) }}
                        onPress={() => {
                            navigation.navigate('ProductDetail', {
                                url_key: item.url_key,
                                uid: item.id,
                                sku: item.sku

                            });
                            // navigation.setOptions({ title: item.name })
                        }}

                    >
                        <View style={styles.itemDetail}>
                            <View>
                                <Image resizeMethod='auto' style={{ width: '100%', height: 150 }} source={{ uri: item.small_image.url }} />
                            </View>
                            <View style={styles.name}>
                                <Text numberOfLines={1} >{item.name}</Text>
                            </View>
                            <Price value={item.price.minimalPrice.amount.value} currency={item.price.minimalPrice.amount.currency} />
                        </View>
                    </Pressable>
                </View>
            })}
        </View>
    )

}

const styles = StyleSheet.create({
    items: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    },
    item: {
        width: '50%',
        padding: 5,

    },
    itemDetail: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 6
    },
    name: {

    }
})
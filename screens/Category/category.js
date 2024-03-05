import React from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useCategory } from './useCategory'
import Price from '../../components/Price'

export default function Category(props) {

    const { route, navigation } = props;

    const { uid } = route.params;

    const talons = useCategory({ uid })

    const { items } = talons;

    return (
        <View style={{ width: '100% ' }}>
            <ScrollView>
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
                                    <View>
                                        <Text>{item.name}</Text>
                                    </View>
                                    <Price value={item.price_range.minimum_price.final_price.value} currency={item.price_range.minimum_price.final_price.currency} />
                                </View>
                            </Pressable>
                        </View>
                    })}
                </View>
            </ScrollView>
        </View>
    );
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
    }
})
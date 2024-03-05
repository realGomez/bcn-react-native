import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useCategoryTree } from './useCategoryTree'

export default function CategoryTree(props) {

    const { route, navigation } = props;

    const talons = useCategoryTree()

    const {
        category,
        subCategories,
        activeCategoryUrlKey,
        activeCategory,
        handlePress
    } = talons;


    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <ScrollView>
                    {category ? category.map(item => {
                        return (
                            <Pressable key={item.url_key} onPress={() => { handlePress(item) }}>
                                <View style={activeCategoryUrlKey == item.url_key ? styles.itemActive : styles.item}  >
                                    <Text>{item.name}</Text>
                                </View>
                            </Pressable>
                        )
                    }) : null}
                </ScrollView>
            </View>

            <View style={styles.children}>
                <ScrollView>
                    {activeCategory.image ?
                        <View style={styles.imageContainer}>
                            <Image resizeMethod='auto' style={{ width: '100%', height: 120 }} source={{ uri: activeCategory.image }} />
                        </View> : null}

                    {subCategories ? subCategories.map(item => {
                        return (
                            <Pressable key={item.url_key}
                                onPress={() => {
                                    navigation.navigate('Category', {
                                        url_key: item.url_key,
                                        uid: item.uid,
                                        name: item.name


                                    });
                                }}

                            >
                                <View style={styles.item}  >
                                    <Text>{item.name}</Text>
                                </View>
                            </Pressable>
                        )
                    }) : null}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row'

    },
    top: {
        height: '100%',
        width: '400',
        backgroundColor: '#eaeaea',
        // flexGrow: 1
        width: '40%'
    },
    children: {
        height: '100%',
        // flexGrow: 4
        width: '60%'

    },
    item: {
        padding: 10,
    },
    itemActive: {
        padding: 10,
        backgroundColor: '#F2F2F2'
    },
    imageContainer: {
        marginLeft: 10,
        marginRight: 10
    }
})
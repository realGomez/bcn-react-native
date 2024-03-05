import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { FormattedMessage } from 'react-intl';
import { useStoreSwitcher } from './useStoreSwitcher';
import globalcss from '../../globalcss';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function StoreSwitcher() {

    const talonsProps = useStoreSwitcher()

    const {
        currentLocale,
        stores,
        hanldeStoreSwitch
    } = talonsProps;

    return (
        <View style={styles.container}>
            {stores.map(item => {
                return (
                    <Pressable key={item.code} onPress={() => hanldeStoreSwitch(item.locale)} style={styles.item}>
                        <Text><FormattedMessage id={`storeSwitcher.${item.locale}`} defaultMessage={item.locale} /></Text>
                        {currentLocale == item.locale ? <Fontisto name="checkbox-active" size={12} /> : <Fontisto name="checkbox-passive" size={12} />}
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: globalcss.indent_s,
        paddingBottom: globalcss.indent_s,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        // marginLeft: globalcss.indent_s,
        // marginRight: globalcss.indent_s,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: globalcss.indent_s,
        paddingBottom: globalcss.indent_s,
        // paddingLeft: globalcss.indent_s,
        // paddingRight: globalcss.indent_s,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor:'#efefef'

    }
})
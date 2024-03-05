import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import globalcss from '../../../globalcss';
import Price from '../../../components/Price';
import { FormattedMessage } from 'react-intl';


export default function PriceSummary(props) {

    const { prices } = props;

    const {
        subtotal_excluding_tax,
        grand_total,
        discounts,
        shipping_addresses
    } = prices;

    return (
        <View>
            {/* <View style={styles.item}>
                <Text> <FormattedMessage id='priceSummary.subtotal' defaultMessage={'Subtotal'} /> </Text>
                <Text>
                    <Price value={subtotal_excluding_tax.value} currency={subtotal_excluding_tax.currency} />
                </Text>
            </View> */}
            <View style={styles.item}>
                <Text> <FormattedMessage id='priceSummary.grandTotal' defaultMessage={'Grand Total'} /> </Text>
                <Text>
                    <Price value={grand_total.value} currency={grand_total.currency} />
                </Text>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between'
    }

})
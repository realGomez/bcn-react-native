import React, { useMemo } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';

const ProductOptions = props => {
    const { options = [] } = props;

    const displayOptions = useMemo(
        () =>
            options.map(({ option_label, value_label, value_id }) => {
                const key = `${option_label}${value_label}`;
                const optionLabelString = `${option_label}：`;
                return (
                    <View key={key} style={styles.optionLabel}>
                        <Text style={styles.optionName}>
                            {optionLabelString}
                        </Text>
                        <Text style={styles.optionValue}>{value_label}</Text>
                    </View>
                );
            }),
        [options]
    );

    if (displayOptions.length === 0) {
        return null;
    }

    return <View style={styles.option}>{displayOptions}</View>;
};

ProductOptions.propTypes = {
    options: arrayOf(
        shape({
            label: string,
            value: string
        })
    )
};

export default ProductOptions;


const styles = StyleSheet.create({
    option: {

    },
    optionLabel:{
       display:'flex',
       flexDirection:'row'
    },
    optionName:{
        
    },
    optionValue:{
    }
})
import React from 'react';
import { View, Pressable, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { bool, func, number, oneOfType, shape, string } from 'prop-types';



const CheckoutFail = props => {
    const {
        hasFocus,
        isSelected,
        item: { label, value_index },
        onClick
    } = props;


    return (
        <Pressable
            onPress={handleClick}
        >
            <Text style={className}>{'CheckoutFail'}</Text>
        </Pressable>
    );
};

export default CheckoutFail;

CheckoutFail.propTypes = {

};

CheckoutFail.defaultProps = {

};

const styles = StyleSheet.create({
    root: {
        padding: 5,
        backgroundColor: '#245798',
        borderRadius: 6,
        color: '#ffffff',
        marginRight: 5

    },
    root_selected: {
        padding: 5,
        backgroundColor: '#accc3b',
        borderRadius: 6,
        color: '#ffffff',
        marginRight: 5
    }
})
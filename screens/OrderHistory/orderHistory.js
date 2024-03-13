import React from 'react';
import { View, Pressable, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { bool, func, number, oneOfType, shape, string } from 'prop-types';

import { useOrderHistory } from './useOrderHistory';

const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}`;

const OrderHistory = props => {
    const {
        hasFocus,
        isSelected,
        item: { label, value_index },
        onClick
    } = props;

    const talonProps = useOrderHistory({
        onClick,
        value_index
    });


    const { handleClick } = talonProps;

    const className = styles[getClassName('root', isSelected, hasFocus)];

    return (
        <Pressable
            onPress={handleClick}
        >
            <Text style={className}>{label}</Text>
        </Pressable>
    );
};

export default OrderHistory;

OrderHistory.propTypes = {
    hasFocus: bool,
    isSelected: bool,
    item: shape({
        label: string.isRequired,
        value_index: oneOfType([number, string]).isRequired
    }).isRequired,
    onClick: func.isRequired
};

OrderHistory.defaultProps = {
    hasFocus: false,
    isSelected: false
};

const styles = StyleSheet.create({
    root: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#245798',
        borderRadius: 3,
        color: '#ffffff',
        marginRight:5,
        

    },
    root_selected: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#accc3b',
        borderRadius: 3,
        color: '#ffffff',
        marginRight:5
    }
})
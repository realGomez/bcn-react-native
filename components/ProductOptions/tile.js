import React from 'react';
import { View, Pressable, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { bool, func, number, oneOfType, shape, string } from 'prop-types';

import { useTile } from './useTile';

const getClassName = (name, isSelected, hasFocus) =>
    `${name}${isSelected ? '_selected' : ''}`;

const Tile = props => {
    const {
        hasFocus,
        isSelected,
        item: { label, value_index },
        onClick
    } = props;

    const talonProps = useTile({
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

export default Tile;

Tile.propTypes = {
    hasFocus: bool,
    isSelected: bool,
    item: shape({
        label: string.isRequired,
        value_index: oneOfType([number, string]).isRequired
    }).isRequired,
    onClick: func.isRequired
};

Tile.defaultProps = {
    hasFocus: false,
    isSelected: false
};

const styles = StyleSheet.create({
    root: {
        padding: 5,
        backgroundColor: '#245798',
        borderRadius: 6,
        color: '#ffffff',
        marginRight:5

    },
    root_selected: {
        padding: 5,
        backgroundColor: '#accc3b',
        borderRadius: 6,
        color: '#ffffff',
        marginRight:5
    }
})
import React, { useMemo } from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { arrayOf, func, object, shape, string } from 'prop-types';
import Tile from './tile';

const TileList = props => {
    const { getItemKey, selectedValue = {}, items, onSelectionChange } = props;

    const tiles = useMemo(
        () =>
            items.map(item => {
                const isSelected = item.label === selectedValue.label;

                return (
                    <Tile
                        key={getItemKey(item)}
                        isSelected={isSelected}
                        item={item}
                        onClick={onSelectionChange}
                    />
                );
            }),
        [getItemKey, selectedValue.label, items, onSelectionChange]
    );

    return <View style={styles.root}>{tiles}</View>;
};

TileList.propTypes = {
    classes: shape({
        root: string
    }),
    getItemKey: func,
    selectedValue: object,
    items: arrayOf(object),
    onSelectionChange: func
};

TileList.displayName = 'TileList';

export default TileList;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // padding: 5
    }
})
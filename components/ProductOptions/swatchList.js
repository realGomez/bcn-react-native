import React, { useMemo } from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { arrayOf, func, object, shape, string } from 'prop-types';
import Swatch from './swatch';


const SwatchList = props => {

    const { getItemKey, selectedValue = {}, items, onSelectionChange } = props;

    const swatches = useMemo(
        () =>
            items.map(item => {
                const isSelected = item.label === selectedValue.label;

                return (
                    <Swatch
                        key={getItemKey(item)}
                        isSelected={isSelected}
                        item={item}
                        onClick={onSelectionChange}
                    />
                );
            }),
        [getItemKey, selectedValue.label, items, onSelectionChange]
    );

    return <div style={classes.root}>{swatches}</div>;
};

SwatchList.propTypes = {
    getItemKey: func,
    selectedValue: object,
    items: arrayOf(object),
    onSelectionChange: func
};

SwatchList.displayName = 'SwatchList';

export default SwatchList;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    }
})
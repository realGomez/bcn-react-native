import React, { useMemo } from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { FormattedMessage } from 'react-intl';
import {
    arrayOf,
    func,
    number,
    object,
    oneOfType,
    shape,
    string
} from 'prop-types';

import getOptionType from './getOptionType';
import SwatchList from './swatchList';
import TileList from './tileList';
import { useOption } from './useOption';
import globalcss from '../../globalcss';

const getItemKey = ({ value_index }) => value_index;

// TODO: get an explicit field from the API
// that identifies an attribute as a swatch
const getListComponent = (attribute_code, values) => {
    const optionType = getOptionType({ attribute_code, values });

    return optionType === 'swatch' ? SwatchList : TileList;
};

const Option = props => {
    const {
        attribute_code,
        attribute_id,
        label,
        onSelectionChange,
        selectedValue,
        values,
        errorList
    } = props;

    const talonProps = useOption({
        attribute_id,
        label,
        onSelectionChange,
        selectedValue,
        values
    });

    const {
        handleSelectionChange,
        initialSelection,
        selectedValueDescription
    } = talonProps;

    const ValueList = useMemo(() => getListComponent(attribute_code, values), [
        attribute_code,
        values
    ]);

    const error = errorList.find(item => {
        return item.param == attribute_id
    })


    return (
        <View style={styles.root}>
            <View style={styles.title}>
                <Text>{label}</Text>
            </View>
            <ValueList
                getItemKey={getItemKey}
                selectedValue={initialSelection}
                items={values}
                onSelectionChange={handleSelectionChange}
            />
            {/* <View style={styles.selection}>
                <View style={styles.selectionLabel}>
                    <Text> <FormattedMessage
                        id="productOptions.selectedLabel"
                        defaultMessage={`Selected ${label}:`}
                        values={{ label }}
                    /></Text>
                </View>
                <Text>{selectedValueDescription}</Text>
            </View> */}
            {error ? <View style={styles.error}>
                <Text style={styles.errorText}>{error.msg}</Text>
            </View> : ''}

        </View>
    );
};

Option.propTypes = {
    attribute_code: string.isRequired,
    attribute_id: string,
    label: string.isRequired,
    onSelectionChange: func,
    selectedValue: oneOfType([number, string]),
    values: arrayOf(object).isRequired
};

export default Option;

const styles = StyleSheet.create({
    root: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // padding: 5
    },
    error: {
        marginTop: 4
    },
    errorText: {
        ...globalcss.error
    }
})
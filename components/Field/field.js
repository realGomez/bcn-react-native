import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable, TextInput } from 'react-native';
import globalcss from '../../globalcss';
import { useIntl } from 'react-intl'
import {
    func,
    string
} from 'prop-types';

const Field = props => {

    const {
        label,
        name,
        placeholder,
        onChangeField,
        formErrors = [],
        defaultValue
    } = props;

    const error = formErrors.find(item => {
        return item.param == name
    })


    return (
        <View style={styles.field}>
            <View style={styles.label}>
                <Text >{label}</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={(text) => onChangeField(name, text)}
                defaultValue={defaultValue}
            />

            {error ? <View style={styles.error}>
                <Text style={styles.errorText}>{error.msg}</Text>
            </View> : ''}

        </View>

    )


}

Field.propTypes = {
    name: string.isRequired,
    onChangeField: func,
};

export default Field;

const styles = StyleSheet.create({
    container: {
        // paddingTop: globalcss.indent_m,
        paddingLeft: globalcss.indent_m,
        paddingRight: globalcss.indent_m,
        backgroundColor: '#ffffff',
        paddingTop: globalcss.indent_s,
        paddingBottom: globalcss.indent_s,

    },
    field: {
        marginBottom: globalcss.indent_m,
        flexGrow:1
    },
    label: {
        marginBottom: 5
    },
    input: {
        ...globalcss.input
    },
    error: {
        marginTop: 4
    },
    errorText: {
        ...globalcss.error
    }

})
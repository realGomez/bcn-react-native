import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useFormError } from './useFormError';
import globalcss from '../../globalcss';

const FormError = props => {
    const { errors } = props;

    const talonProps = useFormError({ errors });
    const { errorMessage } = talonProps;

    return errorMessage ? (
        <View style={styles.error}>
            <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
    ) : null;
};

export default FormError;

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
        marginBottom: globalcss.indent_m
    },
    label: {
        marginBottom: 5
    },
    input: {
        ...globalcss.input
    },
    error: {
        marginTop: 4,
        marginBottom: globalcss.indent_s
    },
    errorText: {
        ...globalcss.error
    }

})

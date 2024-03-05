import React from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions, Pressable, TouchableOpacity } from 'react-native';
import { useCountry } from './useCountry';
import { Picker } from '@react-native-picker/picker';
import globalcss from '../../globalcss';
import { FormattedMessage, useIntl } from 'react-intl';

export default function Country(props) {

    const {
        onChangeField,
        formErrors = [],
    } = props;

    const talonProps = useCountry({ onChangeField })

    const { formatMessage } = useIntl();

    const {
        countries,
        country,
        handleCountryChange,
        availableRegions,
        region,
        handleRegionChange
    } = talonProps


    const items = countries.map((item) => {
        return <Picker.Item label={item.full_name_locale} value={item.two_letter_abbreviation} key={item.two_letter_abbreviation} style={styles.item} />
    })


    const regions = availableRegions.map((item) => {
        return <Picker.Item label={item.name} value={item.code} key={item.code} style={styles.item} />
    })

    const errorCountry = formErrors.find(item => {
        return item.param == 'country_code'
    })

    const errorRegion = formErrors.find(item => {
        return item.param == 'region'
    })

    return (
        <View >

            <View style={styles.field}>
                <View style={styles.label}>
                    <Text><FormattedMessage id='country.countryRegion' defaultMessage={'Country/Region'} /></Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={country}
                        onValueChange={(itemValue, itemIndex) => {
                            handleCountryChange(itemValue);
                            onChangeField('country_code', itemValue)
                        }
                        }
                        style={{
                            marginLeft: -8,
                            marginLeft: -8,
                            marginTop: -6,
                            marginBottom: -6
                        }}
                    >
                        <Picker.Item
                            label={formatMessage({ id: 'country.pleaseSelect', defaultMessage: 'Please Select' })}
                            value={''}
                            style={styles.placeholder} />
                        {items}
                    </Picker>

                </View>
                {errorCountry ? <View style={styles.error}>
                    <Text style={styles.errorText}>{errorCountry.msg}</Text>
                </View> : ''}
            </View>

            <View style={styles.field}>
                <View style={styles.label}>
                    <Text ><FormattedMessage id='country.region' defaultMessage={'Region'} /></Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={region}
                        onValueChange={(itemValue, itemIndex) => {
                            handleRegionChange(itemValue)
                            // onChangeField('region', itemValue)
                        }
                        }
                        style={{
                            marginLeft: -8,
                            marginLeft: -8,
                            marginTop: -6,
                            marginBottom: -6,
                        }}
                    >
                        <Picker.Item
                            label={formatMessage({ id: 'country.pleaseSelect', defaultMessage: 'Please Select' })}
                            value={''}
                            style={styles.placeholder}
                        />
                        {regions}
                    </Picker>
                </View>
                {errorRegion ? <View style={styles.error}>
                    <Text style={styles.errorText}>{errorRegion.msg}</Text>
                </View> : ''}
            </View>

        </View>
    )

}

const styles = StyleSheet.create({

    field: {
        marginBottom: globalcss.indent_m
    },
    label: {
        marginBottom: 5
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 6
    },
    picker: {
        paddingRight: 5,
        paddingLeft: 5
    },
    placeholder: {
        fontSize: 14,
        paddingLeft: 0,
        paddingRight: 0,
        color: '#8a8a8a'
    },
    item: {
        fontSize: 14,
    },
    textInputViewStyle: {

    },
    SelecttextInputStyle: {

    },
    error: {
        marginTop: 4
    },
    errorText: {
        ...globalcss.error
    }
})


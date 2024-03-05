import React, { Fragment } from 'react';
import { number, string, shape } from 'prop-types';
import { useIntl } from 'react-intl';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import IntlPatches from '../../utils/intlPatches';


const Price = props => {
    const { locale } = useIntl();
    const { value, currency } = props;

    const parts = IntlPatches.toParts.call(
        new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }),
        value
    );

    const children = parts.map((part, i) => {
        const key = `${i}-${part.value}`;

        return (
            <Fragment key={key} >
                {part.value}
            </Fragment>
        );
    });

    return <Text>{children}</Text>;
};

Price.propTypes = {
    value: number.isRequired,
    currency: string.isRequired
};

Price.defaultProps = {
    classes: {}
};

export default Price;

const styles = StyleSheet.create({
    price: {
        // textAlign: 'center'
    }
})
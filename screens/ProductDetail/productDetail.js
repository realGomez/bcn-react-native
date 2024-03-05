import React, { useState, useCallback } from 'react';
import { View, Pressable, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { useProductDetail } from './useProductDetail'
import Price from '../../components/Price'
import Carousel from 'react-native-reanimated-carousel';
import AutoFitImage from '../../components/AutoFitImage';
import Dots from 'react-native-dots-pagination';
import CmsRender from '../../components/CmsRender/cmsRender';
import Options from '../../components/ProductOptions';
import globalcss from '../../globalcss';
import { FormattedMessage, useIntl } from 'react-intl';


export default function ProductDetail(props) {

    const { route, navigation } = props;
    const { sku } = route.params;

    const { formatMessage } = useIntl();

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height / 3;

    const [carouselHeight, setCarouselHeight] = useState(height);
    const [activeDot, setActiveDot] = useState(0);

    const talons = useProductDetail({ sku })

    const {
        product,
        optionSelections,
        optionCodes,
        handleSelectionChange,
        handleAddProductToCart,
        loading,
        errorList
    } = talons;

    const handleSetHeight = useCallback((value) => {
        if (value > carouselHeight) {
            setCarouselHeight(value)
        }
    }, [setCarouselHeight])


    if (!product) return

    const {
        media_gallery,
        name,
        price_range,
        description,
        short_description,
        configurable_options,
        variants
    } = product;

    // console.log('variants', variants)
    // console.log('configurable_options', configurable_options)

    return (

        <View style={styles.page}>
            <ScrollView>

                <Carousel
                    loop={true}
                    width={width}
                    height={carouselHeight}
                    autoPlay={false}
                    data={media_gallery}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => { setActiveDot(index) }}
                    renderItem={({ item, index }) => (
                        <View
                            onLayout={(event) => {
                                const { x, y, width, height } = event.nativeEvent.layout;
                                handleSetHeight(height)
                            }}
                        >
                            {/* <Image resizeMethod='auto' style={{ width: '100%', height: 200 }} source={{ uri: item.url }} /> */}
                            <AutoFitImage
                                imageUrl={item.url}
                                imageFullWith={true}
                            />
                            <Text >

                            </Text>
                        </View>
                    )}
                />

                <Dots
                    length={media_gallery.length}
                    active={activeDot}
                    passiveDotWidth={5}
                    activeDotWidth={6}
                    passiveDotHeight={5}
                    activeDotHeight={6}
                    passiveColor={'#245798'}
                    activeColor={'#accc3b'}
                />

                <View style={styles.container}>
                    <View>
                        <Text style={styles.name}>
                            {name}
                        </Text>
                        <Price value={price_range.minimum_price.final_price.value} currency={price_range.minimum_price.final_price.currency} />

                    </View>

                    {configurable_options ? <View style={styles.options}>
                        <Options
                            onSelectionChange={handleSelectionChange}
                            options={configurable_options}
                            variants={variants}
                            optionCodes={optionCodes}
                            optionSelections={optionSelections}
                            errorList={errorList}
                        />
                    </View> : null}

                    <TouchableHighlight onPress={handleAddProductToCart} disabled={loading} style={styles.touchableHighlight}>
                        <View style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>
                                {formatMessage({
                                    id: 'global.addToCart',
                                    defaultMessage: 'addToCart'
                                })}
                            </Text>
                        </View>
                    </TouchableHighlight>


                    <CmsRender
                        content={description.html}
                        route={route}
                        navigation={navigation}
                    />
                    <CmsRender
                        content={short_description.html}
                        route={route}
                        navigation={navigation}
                    />

                </View>


            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
    },
    container: {
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        paddingTop: globalcss.indent_m,
        paddingBottom: globalcss.indent_m,
    },
    name: {
        textAlign: 'center'
    },

    options: {
        marginBottom: 20
    },
    primaryButton: {
        ...globalcss.primaryButton,
    },
    primaryButtonText: {
        ...globalcss.primaryButtonText
    },
    touchableHighlight: {
        borderRadius: 6,
        marginBottom: 20

    }
})
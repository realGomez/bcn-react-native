import React, { useCallback, useMemo, useState } from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import CmsProducts from '../CmsProducts';
import AutoFitImage from '../AutoFitImage';
import Dots from 'react-native-dots-pagination';
import { wxParse } from '../../wxParse/wxParse';

function TreeNode(props) {

    const {
        item,
        images,
        imageUrls,
        videos,
        videoUrls,
        cmsNode,
        route,
        navigation,
        imageFullWith,
        parentNodeTag
    } = props;


    const { node, attr, classStr, nodes = [], pageBuilderContentType, parentPageBuilderContentType, parentClassStr, tag, tagType, text } = item;


    if (node == 'element' && tag == "div" && pageBuilderContentType == "slider") {

        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height / 2;

        const [carouselHeight, setCarouselHeight] = useState(height);
        const [activeDot, setActiveDot] = useState(0);


        const handleSetHeight = useCallback((value) => {
            // setCarouselHeight(value)
            // console.log('value---', value);
            if (value > carouselHeight) {
                setCarouselHeight(value)
            }
        }, [carouselHeight, setCarouselHeight])


        return <View style={styles.row}>
            <Carousel
                loop={true}
                width={width}
                height={carouselHeight}
                autoPlay={false}
                data={nodes}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => { setActiveDot(index) }}
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
                pagingEnabled={true}
                renderItem={({ item: sliderItem }) => (
                    <View
                        onLayout={(event) => {
                            const { x, y, width, height } = event.nativeEvent.layout;
                            handleSetHeight(height)
                        }}
                    >
                        <TreeNode
                            // key={item.index}
                            item={sliderItem}
                            images={images}
                            imageUrls={imageUrls}
                            videos={videos}
                            videoUrls={videoUrls}
                            route={route}
                            navigation={navigation}
                            imageFullWith={true}
                        />
                    </View>
                )}
            />
            <Dots
                length={nodes.length}
                active={activeDot}
                passiveDotWidth={5}
                activeDotWidth={6}
                passiveDotHeight={5}
                activeDotHeight={6}
                passiveColor={'#245798'}
                activeColor={'#accc3b'}
            />
        </View>
    } if (node == 'element' && tag == "div" && pageBuilderContentType == "products") {
        return <View style={styles.row}>
            <CmsProducts
                attr={attr}
                nodes={nodes}
                images={images}
                imageUrls={imageUrls}
                videos={videos}
                videoUrls={videoUrls}
                route={route}
                navigation={navigation}
            />
        </View>
    } else if (node == 'element' && tag == "div") {
        return <View style={pageBuilderContentType == "row" && parentClassStr != "pagebuilder-slider" ? styles.row : ''
        }>
            {
                nodes.map((item) => {
                    return (
                        <TreeNode
                            key={item.index}
                            item={item}
                            images={images}
                            imageUrls={imageUrls}
                            videos={videos}
                            videoUrls={videoUrls}
                            route={route}
                            navigation={navigation}
                            imageFullWith={imageFullWith}
                        />
                    )
                })
            }
        </View >
    } else if (node == 'element' && tag == "figure") {
        return <View>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        imageFullWith={imageFullWith}

                    />
                )
            })
            }
        </View>
    } else if (node == 'element' && tag == "a") {
        return <View>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        imageFullWith={imageFullWith}
                        parentNodeTag={'a'}

                    />
                )
            })
            }
        </View>
    } else if (node == 'element' && tag == "img" && attr['data-element'] != "desktop_image") {
        return (
            <AutoFitImage
                imageUrl={attr.src}
                imageFullWith={imageFullWith}

            />)
    } else if (node == "element" && (tag == "h1" || tag == "h2" || tag == "h3" || tag == "h4" || tag == "h5")) {
        return <View style={styles.h}>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        parentNodeTag={'h'}
                    />
                )
            })
            }
        </View>
    } else if (node == "element" && tag == "p") {
        return <View style={styles.p}>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        parentNodeTag={'p'}
                    />
                )
            })
            }
        </View>
    } else if (node == "element" && tag == "ol") {
        return <View>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        imageFullWith={imageFullWith}
                        parentNodeTag={'ol'}
                    />
                )
            })
            }
        </View>
    } else if (node == "element" && tag == "ul") {
        return <View>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        imageFullWith={imageFullWith}
                        parentNodeTag={'ul'}

                    />
                )
            })
            }
        </View>
    } else if (node == "element" && tag == "li") {
        return <View>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        imageFullWith={imageFullWith}
                        parentNodeTag={'li'}

                    />
                )
            })
            }
        </View>
    } else if (node == "element" && tag == "span") {
        return <View>
            {nodes.map((item) => {
                return (
                    <TreeNode
                        key={item.index}
                        item={item}
                        images={images}
                        imageUrls={imageUrls}
                        videos={videos}
                        videoUrls={videoUrls}
                        route={route}
                        navigation={navigation}
                        parentNodeTag={'span'}

                    />
                )
            })
            }
        </View>
    } else if (node == "text") {
        return (
            <Text style={parentNodeTag ? styles[parentNodeTag] : styles.text}>{text}</Text>
        )
    }
}

export default function CmsRender(props) {

    const {
        content,
        route,
        navigation
    } = props;


    const Obj = {};

    const htmlNodes = useMemo(() => {
        return wxParse('cmsNode', 'html', content, Obj, 0);

    }, [content])


    // return htmlNodes

    const {
        images,
        imageUrls,
        node,
        nodes,
        videos,
        videoUrls
    } = htmlNodes.content;



    const rendering = nodes.map((item) => {
        return <TreeNode
            key={item.index}
            item={item}
            images={images}
            imageUrls={imageUrls}
            videos={videos}
            videoUrls={videoUrls}
            route={route}
            navigation={navigation}
        />
    })

    return (
        <View>
            {rendering}
        </View>
    )

}

const styles = StyleSheet.create({
    p: {
        fontSize: 14,
        color: '#707070',
        textAlign: 'center',
    },
    h: {
        fontSize: 18,
        color: '#707070',
        textAlign: 'center',
        marginBottom: 10,

    },
    a: {
        fontSize: 14,
        color: '#accc3b',
        textAlign: 'center',

    },
    text: {
        fontSize: 14,
    },
    row: {
        marginBottom: 30,

    },
});
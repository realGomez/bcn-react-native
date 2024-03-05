import React from 'react';
import { View, Button, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';

class AutoFitImage extends React.Component {

    state = {
        imgWidth: '100%',
        imgHeight: 200
    }

    componentDidMount() {

        Image.getSize(this.props.imageUrl, (width, height) => {
            // calculate image width and height 
            const screenWidth = Dimensions.get('window').width
            if (width / 2 < screenWidth && !this.props.imageFullWith) {
                this.setState({ imgWidth: width / 2, imgHeight: height / 2 })

            } else {
                const scaleFactor = width / screenWidth
                const imageHeight = height / scaleFactor
                this.setState({ imgWidth: screenWidth, imgHeight: imageHeight })
            }


        })
    }

    render() {

        const { imgWidth, imgHeight } = this.state

        return (
            <Image
                resizeMethod='auto'
                style={{ width: imgWidth, height: imgHeight }}
                source={{ uri: this.props.imageUrl }}
            />

        )
    }
}

export default AutoFitImage

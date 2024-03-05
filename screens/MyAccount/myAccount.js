import React from 'react';
import { View, Button, Text, StyleSheet, Image, ScrollView, Pressable, TouchableHighlight } from 'react-native';
import { FormattedMessage } from 'react-intl';
import globalcss from '../../globalcss';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { setToken, setUserInfo } from '../../redux/reducers/user'
import { useSelector, useDispatch } from 'react-redux'

export default function MyAccount(props) {
    const { route, navigation } = props;

    const { userInfo, isSignedIn } = useSelector((state) => state.user)

    return (
        <View style={styles.container}>

            <View style={styles.section}>
                {isSignedIn ?
                    <View>
                        <Text>{userInfo.firstname}</Text>

                    </View>
                    : <TouchableHighlight onPress={() => {
                        navigation.navigate('Login', {

                        })
                    }}>
                        <View style={styles.link}>
                            <Text style={styles.text}>
                                <FormattedMessage
                                    id={'myAccount.login'}
                                    defaultMessage={'Login'}
                                />
                            </Text>
                            <AntDesign name="right" color={'#000000'} size={10} />
                        </View>
                    </TouchableHighlight>}

            </View>


            <View style={styles.section}>
                <TouchableHighlight onPress={() => {
                    navigation.navigate('StoreSwitcher', {

                    })
                }}>
                    <View style={styles.link}>
                        <Text style={styles.text}>
                            <FormattedMessage
                                id={'myAccount.languageSwitch'}
                                defaultMessage={'Langauage'}
                            />
                        </Text>
                        <AntDesign name="right" color={'#000000'} size={10} />
                    </View>
                </TouchableHighlight>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: globalcss.indent_s,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,

    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingTop: globalcss.indent_m,
        paddingLeft: globalcss.indent_s,
        paddingRight: globalcss.indent_s,
        paddingBottom: globalcss.indent_m,
        marginBottom: globalcss.indent_s,

    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        //  paddingLeft: globalcss.indent_m,
        // paddingRight: globalcss.indent_m,
        // padding: globalcss.indent_s,
        // marginBottom: globalcss.indent_s,
    },
    text: {
        marginRight: 'auto'
    }
})
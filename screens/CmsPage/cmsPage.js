import React from 'react';
import { View, Button, Text, ScrollView } from 'react-native';
import { useCmsPage } from './useCmsPage';
import CmsRender from '../../components/CmsRender/cmsRender';
export default function CmsPage(props) {

    const { route, navigation } = props;


    const talonProps = useCmsPage();

    const { content } = talonProps;

    return (
        <ScrollView >
            <CmsRender
                content={content}
                route={route}
                navigation={navigation}
            />
        </ScrollView>
    );
}
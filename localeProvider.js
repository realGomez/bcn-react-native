import React, { useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { fromReactIntl, toReactIntl } from './utils/formatLocale';
import { gql, useQuery } from '@apollo/client';
import zh_Hant_HK from './i18n/zh_Hant_HK';
import zh_Hans_CN from './i18n/zh_Hans_CN';
import en_US from './i18n/en_US';
import { setStore, clearStore } from './redux/reducers/app'
import { useSelector, useDispatch } from 'react-redux'

const GET_LOCALE = gql`
    query getLocale {
        storeConfig {
            id
            locale
        }
    }
`;

const LocaleProvider = props => {
    const { children } = props;

    const { store } = useSelector((state) => state.app)
    const dispatch = useDispatch()

    const [messages, setMessages] = useState(null);


    const { data } = useQuery(GET_LOCALE, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const language = useMemo(() => {
        return store && store.locale ? toReactIntl(store.locale) : (data && data.storeConfig.locale
            ? toReactIntl(data.storeConfig.locale)
            : 'zh-Hant-HK');
    }, [data, store]);


    // console.log('language', language);
    // console.log('store', store);



    useEffect(() => {
        dispatch(setStore({
            locale: data && data.storeConfig.locale ? data.storeConfig.locale : 'zh_Hant_HK'
        }))
    }, [data, dispatch])


    useEffect(() => {
        if (language) {
            const locale = fromReactIntl(language);

            switch (locale) {
                case 'zh_Hant_HK': {
                    setMessages(zh_Hant_HK);
                    break
                }
                case 'zh_Hans_CN': {
                    setMessages(zh_Hans_CN);
                    break
                }
                case 'en_US': {
                    setMessages(en_US);
                    break
                }
                default: {
                    setMessages(zh_Hant_HK);
                }
            }

        }
    }, [language, setMessages]);

    const handleIntlError = error => {
        if (messages) {
            if (error.code === 'MISSING_TRANSLATION') {
                console.warn('Missing translation', error.message);
                return;
            }
            throw error;
        }
    };

    return (
        <IntlProvider
            key={language}
            // {...props}
            defaultLocale={'en-US'}
            locale={language}
            messages={messages}
            onError={handleIntlError}
        >
            {children}
        </IntlProvider>
    );
};

export default LocaleProvider;

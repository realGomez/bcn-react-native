import I18n from 'i18n-js';
// import { translations } from './localization';
import * as Localization from 'expo-localization';

import en_US from './en_US';
import zh_Hans_CN from './zh_Hans_CN';
import zh_Hant_HK from './zh_Hant_HK';



I18n.translations = {
  en_US,
  zh_Hans_CN,
  zh_Hant_HK
};
I18n.locale = "zh_Hant_HK"
I18n.enableFallback = true
I18n.defaultLocale = "zh_Hant_HK"


export default I18n;
/**
 * Convert locale from react-intl BCP 47 language code, to Magento standard
 *
 * @param {string} string
 * @returns {string} A locale string (e.g. `fr_FR`).
 */
export const fromReactIntl = string => {
    

    // if(string=='zh-Hans-CN'||string=='zh-Hant-HK'){
    //     return string.replaceAll('-', '_');
    // }else{
    //     return string.replace('-', '_');
    // }

    return string.replace(/-/g,'_');
 
};

/**
 * Convert locale from Magento standard to react-intl BCP 47 language code
 *
 * @param {string} string
 * @returns {string} A string (e.g. `fr-FR`).
 */
export const toReactIntl = string => {

    // if(string=='zh_Hans_CN' ||string=='zh_Hant_HK'){
    //     return string.replaceAll('_', '-');
        
    // }else{
    //     return string.replace('_', '-');
    // }

    return string.replace(/_/g,'-');

};

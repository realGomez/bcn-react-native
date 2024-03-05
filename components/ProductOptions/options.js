import React from 'react';
import { array, func } from 'prop-types';

import Option from './option';
import { useOptions } from './useOptions';

const Options = props => {
    const { onSelectionChange, options, selectedValues = [], errorList } = props;

    const talonProps = useOptions({
        onSelectionChange,
        selectedValues
    });

    const { handleSelectionChange, selectedValueMap } = talonProps;
    // selectedValues []
    // selectedValueMap {}


    // Render a list of options passing in any pre-selected values.
    return options.map(option => (
        <Option
            {...option}
            key={option.attribute_id}
            onSelectionChange={handleSelectionChange}
            selectedValue={selectedValueMap.get(option.label)}
            errorList={errorList}
        />
    ));
};

Options.propTypes = {
    onSelectionChange: func,
    options: array.isRequired,
    selectedValues: array
};

export default Options;

import { useMemo } from 'react';
import { deriveErrorMessage } from '../../utils/deriveErrorMessage';

export const useFormError = props => {
    const { errors } = props;

    const derivedErrorMessage = useMemo(() => deriveErrorMessage(errors), [
        errors
    ]);

    return {
        errorMessage: derivedErrorMessage
    };
};

import { useCallback } from 'react';

export const useOrderHistory = props => {
    const { onClick, value_index } = props;

    const handleClick = useCallback(() => {
        onClick(value_index);
    }, [value_index, onClick]);

    return {
        handleClick
    };
};

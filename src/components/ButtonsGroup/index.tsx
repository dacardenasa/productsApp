import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomButton } from '../CustomButton';

type AddCustomButtonStylesArgs = {
    isTheFirstItem: boolean;
    isTheLastItem: boolean;
};

const addCustomButtonStyle = ({
    isTheFirstItem,
    isTheLastItem
}: AddCustomButtonStylesArgs) => {
    if (isTheFirstItem || isTheLastItem) {
        return {
            buttonStyle: {
                borderTopLeftRadius: isTheFirstItem ? 4 : 0,
                borderBottomLeftRadius: isTheFirstItem ? 4 : 0,
                borderTopRightRadius: isTheLastItem ? 4 : 0,
                borderBottomRightRadius: isTheLastItem ? 4 : 0
            }
        };
    }
    return {};
};

type ButtonsGroupProps<T> = {
    items: T[];
    handleOnPress: (isItemSelected: boolean, item: T) => void;
};

type ButtonsGroupMultiSelectProps<T> = {
    type: 'multiSelect';
    values: T[];
};

type ButtonsGroupSingleSelectProps<T> = {
    type: 'singleSelect';
    value: T;
};

export const ButtonsGroup = <T,>(
    props: ButtonsGroupProps<T> &
        (ButtonsGroupMultiSelectProps<T> | ButtonsGroupSingleSelectProps<T>)
) => {
    return (
        <View style={[styles.fullBox, styles.rowBox]}>
            {props.items.map((item, index) => {
                const isItemSelected =
                    props.type === 'multiSelect'
                        ? props.values.includes(item)
                        : props.value === item;
                return (
                    <CustomButton
                        key={`${item}-${index}`}
                        label={item as string}
                        handleOnPress={() =>
                            props.handleOnPress(isItemSelected, item)
                        }
                        variant={isItemSelected ? 'secondary' : 'primary'}
                        {...addCustomButtonStyle({
                            isTheFirstItem: index === 0,
                            isTheLastItem: index === props.items.length - 1
                        })}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    fullBox: { flex: 1 },
    rowBox: { flexDirection: 'row' }
});

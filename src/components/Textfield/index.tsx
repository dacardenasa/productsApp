import React from 'react';
import {
    Platform,
    StyleProp,
    Text,
    TextInput,
    TextInputProps,
    TextStyle
} from 'react-native';
import { themeStyles } from '@/theme';

type Default = {
    label: string;
    textfieldProps: TextInputProps;
    type: 'default';
};

type Custom = Pick<Default, 'label' | 'textfieldProps'> & {
    labelStyle: StyleProp<TextStyle>;
    type: 'custom';
};

type TextFieldProps = Default | Custom;

export const Textfield = (props: TextFieldProps) => {
    return (
        <>
            <Text
                style={
                    props.type === 'custom'
                        ? props.labelStyle
                        : [themeStyles.label]
                }
            >
                {props.label}
            </Text>
            <TextInput
                selectionColor="white"
                style={
                    Platform.OS === 'ios'
                        ? {
                              ...themeStyles.textField,
                              ...themeStyles.textFieldUnderline
                          }
                        : themeStyles.textField
                }
                {...props.textfieldProps}
            />
        </>
    );
};

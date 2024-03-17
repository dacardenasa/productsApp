import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle
} from 'react-native';

type CustomButtonProps = {
    handleOnPress: () => void;
    label: string;
    variant: 'primary' | 'secondary';
    buttonStyle?: StyleProp<ViewStyle>;
    isButtonDisabled?: boolean;
};

export const CustomButton = ({
    label,
    handleOnPress,
    variant = 'primary',
    buttonStyle = {},
    isButtonDisabled = false
}: CustomButtonProps) => {
    const variantButton =
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;
    return (
        <TouchableOpacity
            onPress={handleOnPress}
            style={[styles.button, buttonStyle, variantButton]}
            disabled={isButtonDisabled}
            activeOpacity={0.8}
        >
            <Text
                style={[
                    styles.buttonLabel,
                    variant === 'primary'
                        ? styles.LabelPrimary
                        : styles.LabelSecondary
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    buttonLabel: {
        textAlign: 'center'
    },
    buttonPrimary: {
        backgroundColor: 'white',
        borderColor: '#1F66FE',
        borderWidth: 1
    },
    LabelPrimary: {
        color: '#1F66FE'
    },
    buttonSecondary: {
        backgroundColor: '#1F66FE'
    },
    LabelSecondary: {
        color: 'white'
    }
});

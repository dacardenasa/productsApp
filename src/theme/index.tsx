import { StyleSheet } from 'react-native';

export const themeStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: 16,
        marginBottom: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    label: {
        fontSize: 16,
        color: 'white'
    },
    textField: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 8
    },
    textFieldUnderline: {
        borderBottomColor: 'white',
        borderWidth: 1
    },
    formButton: {
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        width: 'auto',
        height: 48,
        alignSelf: 'center'
    },
    formButtonText: {
        color: 'white',
        fontSize: 16
    },
    newAccountButton: {
        alignSelf: 'flex-end'
    }
});

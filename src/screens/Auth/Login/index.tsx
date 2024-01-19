import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text>LoginScreen</Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Background = () => {
    return <View style={styles.background} />;
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#5856d6',
        width: 1000,
        height: 1200,
        top: -250,
        position: 'absolute',
        transform: [{ rotate: '-70deg' }]
    }
});

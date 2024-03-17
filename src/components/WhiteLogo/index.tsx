import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const WhiteLogo = () => (
    <View style={styles.box}>
        <Image
            source={require('../../../assets/react-logo-white.png')}
            style={styles.image}
        />
    </View>
);

const styles = StyleSheet.create({
    box: {
        alignItems: 'center'
    },
    image: {
        width: 110,
        height: 100
    }
});

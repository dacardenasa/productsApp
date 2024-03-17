import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const IconButton = ({
    handleOnPressButton
}: {
    handleOnPressButton: () => void;
}) => (
    <TouchableOpacity onPress={handleOnPressButton} activeOpacity={0.9}>
        <View style={styles.iconButtonBox}>
            <Ionicons name="add" size={32} color="white" />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    iconButtonBox: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#1F66FE',
        elevation: 3
    }
});

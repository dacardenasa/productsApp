import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export const Loader = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <Modal animationType="fade" visible={isVisible} transparent>
            <View style={styles.mainBox}>
                <View style={styles.centeredView}>
                    <ActivityIndicator size={50} color="white" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainBox: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 150,
        backgroundColor: 'rgba(43, 40, 69, 0.6)'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    }
});

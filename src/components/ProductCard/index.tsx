import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type ProductCardProps = {
    productName: string;
    image?: string | null;
    handleOnPressCard: () => void;
};

const $ProductCard = ({
    productName,
    image,
    handleOnPressCard
}: ProductCardProps) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOnPressCard}
        style={styles.container}
    >
        <Image
            source={
                image
                    ? { uri: image }
                    : require('../../../assets/images/defaultImage.png')
            }
            style={styles.imageBox}
        />
        <Text style={styles.title}>{productName}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: '49%',
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        borderColor: '#278ea5',
        borderWidth: 1,
        borderLeftWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
    title: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold'
    },
    imageBox: {
        width: '100%',
        height: 200
    }
});

export const ProductCard = React.memo($ProductCard);

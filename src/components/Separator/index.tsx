import React from 'react';
import { View } from 'react-native';

type SeparatorProps = {
    width?: number;
    height: number;
};

export const Separator = ({ width = 0, height = 0 }: SeparatorProps) => (
    <View
        style={{
            width,
            height
        }}
    />
);

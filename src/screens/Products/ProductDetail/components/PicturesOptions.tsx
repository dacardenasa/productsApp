import { CustomButton, Separator } from '@/components';
import CustomModal from '@/components/CustomModal';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type PicturesOptionsProps = {
    isVisible: boolean;
    toggleModal: () => void;
    handleOnPressPickImage: () => void;
    handleOnPressTakePicture: () => void;
};

export const PicturesOptions = ({
    isVisible,
    toggleModal,
    handleOnPressPickImage,
    handleOnPressTakePicture
}: PicturesOptionsProps) => {
    return (
        <CustomModal isVisible={isVisible} toggleModal={toggleModal}>
            <View style={styles.container}>
                <CustomButton
                    label="Open gallery"
                    variant="secondary"
                    handleOnPress={handleOnPressPickImage}
                />
                <Separator width={16} height={0} />
                <CustomButton
                    label="Take picture"
                    variant="secondary"
                    handleOnPress={handleOnPressTakePicture}
                />
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});

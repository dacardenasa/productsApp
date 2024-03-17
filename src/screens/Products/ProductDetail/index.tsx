import React, { useCallback } from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
    Gender,
    NewProductInfo,
    ProductDetailScreenNavigationProp,
    Size
} from '@/interfaces';
import {
    ButtonsGroup,
    CustomButton,
    Loader,
    Separator,
    Textfield
} from '@/components';

import { useProductDetail } from './useProductDetail';
import { Formik } from 'formik';
import { gendersList, sizesList } from '@/constants/global';
import { Header, HeaderBackButton } from '@react-navigation/elements';
import { PicturesOptions } from './components/PicturesOptions';

export const ProductDetailScreen = ({
    navigation,
    route: {
        params: { productName, productId }
    }
}: ProductDetailScreenNavigationProp) => {
    const {
        product,
        isLoadingCreateOrSaveProduct,
        isLoadingInitialData,
        onSubmit,
        toggleModal,
        pickImage,
        takePicture,
        isModalOpen
    } = useProductDetail(productId);

    const renderHeaderRight = useCallback(
        () => (
            <Ionicons.Button
                name="image"
                size={32}
                color="black"
                backgroundColor={'white'}
                activeOpacity={0.9}
                onPress={toggleModal}
            />
        ),
        [toggleModal]
    );

    const renderHeaderLeft = useCallback(
        () => <HeaderBackButton onPress={navigation.goBack} />,
        [navigation.goBack]
    );

    if (isLoadingInitialData) {
        return <Loader isVisible />;
    }

    return (
        <Formik initialValues={product as NewProductInfo} onSubmit={onSubmit}>
            {({ handleChange, setFieldValue, handleSubmit, values }) => (
                <>
                    <PicturesOptions
                        isVisible={isModalOpen}
                        toggleModal={toggleModal}
                        handleOnPressPickImage={() => {
                            pickImage(setFieldValue, values.images);
                            toggleModal();
                        }}
                        handleOnPressTakePicture={() => {
                            takePicture(setFieldValue, values.images);
                            toggleModal();
                        }}
                    />
                    <Header
                        title={productName}
                        headerLeft={renderHeaderLeft}
                        headerRight={renderHeaderRight}
                    />
                    <ScrollView style={styles.container}>
                        {isLoadingCreateOrSaveProduct ? (
                            <Loader isVisible />
                        ) : null}
                        {values.images.length ? (
                            <FlatList
                                data={values.images}
                                keyExtractor={(item) => item}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <Image
                                        source={{ uri: item }}
                                        style={styles.image}
                                    />
                                )}
                                ItemSeparatorComponent={Separator}
                            />
                        ) : (
                            <View style={styles.defaultImageBox}>
                                <Image
                                    source={require('../../../../assets/images/defaultImage.png')}
                                    style={styles.image}
                                />
                            </View>
                        )}
                        <Separator height={16} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Textfield
                                type="custom"
                                labelStyle={styles.labelStyle}
                                label="Product name"
                                textfieldProps={{
                                    value: values.title,
                                    onChangeText: handleChange('title'),
                                    placeholder: 'Title',
                                    placeholderTextColor: 'gray',
                                    autoCapitalize: 'words',
                                    autoCorrect: false,
                                    style: styles.textField
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <Separator height={16} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Textfield
                                type="custom"
                                labelStyle={styles.labelStyle}
                                label="Slug"
                                textfieldProps={{
                                    value: values.slug,
                                    onChangeText: handleChange('slug'),
                                    placeholder: 'Slug',
                                    placeholderTextColor: 'gray',
                                    autoCapitalize: 'words',
                                    autoCorrect: false,
                                    style: styles.textField
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <Separator height={16} />
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Textfield
                                type="custom"
                                labelStyle={styles.labelStyle}
                                label="Description"
                                textfieldProps={{
                                    value: values.description,
                                    onChangeText: handleChange('description'),
                                    placeholder: 'Description',
                                    placeholderTextColor: 'gray',
                                    autoCorrect: false,
                                    style: styles.textField,
                                    multiline: true
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <Separator height={16} />
                        <View style={styles.rowBoxWithSeparation}>
                            <View style={styles.fullBox}>
                                <TouchableWithoutFeedback
                                    onPress={Keyboard.dismiss}
                                >
                                    <Textfield
                                        type="custom"
                                        labelStyle={styles.labelStyle}
                                        label="Price"
                                        textfieldProps={{
                                            value: values.price.toString(),
                                            onChangeText: handleChange('price'),
                                            placeholder: 'Price',
                                            placeholderTextColor: 'gray',
                                            autoCorrect: false,
                                            keyboardType: 'numeric',
                                            style: styles.textField
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.fullBox}>
                                <TouchableWithoutFeedback
                                    onPress={Keyboard.dismiss}
                                >
                                    <Textfield
                                        type="custom"
                                        labelStyle={styles.labelStyle}
                                        label="Inventory"
                                        textfieldProps={{
                                            value: values.stock.toString(),
                                            onChangeText: handleChange('stock'),
                                            placeholder: 'Stock',
                                            placeholderTextColor: 'gray',
                                            autoCorrect: false,
                                            keyboardType: 'numeric',
                                            style: styles.textField
                                        }}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <Separator height={16} />
                        <Text style={styles.labelStyle}>Sizes</Text>
                        <Separator height={16} />
                        <ButtonsGroup<Size>
                            items={sizesList}
                            values={values.sizes}
                            handleOnPress={(isItemSelected, size) =>
                                setFieldValue(
                                    'sizes',
                                    isItemSelected
                                        ? values.sizes.filter((s) => s !== size)
                                        : [...values.sizes, size]
                                )
                            }
                            type="multiSelect"
                        />
                        <Separator height={16} />
                        <Text style={styles.labelStyle}>Genders</Text>
                        <Separator height={16} />
                        <ButtonsGroup<Gender>
                            items={gendersList}
                            value={values.gender}
                            handleOnPress={(_, gender) =>
                                setFieldValue('gender', gender)
                            }
                            type="singleSelect"
                        />
                        <Separator height={16} />
                        <CustomButton
                            label={'Guardar'}
                            handleOnPress={handleSubmit}
                            variant="secondary"
                        />
                        <Separator height={50} />
                    </ScrollView>
                </>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        padding: 16
    },
    labelStyle: {
        color: 'black',
        fontWeight: 'bold'
    },
    textField: {
        height: 'auto',
        padding: 8,
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    image: { width: 300, height: 300 },
    defaultImageBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowBoxWithSeparation: { flexDirection: 'row', gap: 10 },
    fullBox: { flex: 1 },
    galleryBox: { paddingHorizontal: 8 }
});

import {
    NewProductInfo,
    ProductDetailScreenNavigationProp,
    ProductInfo
} from '@/interfaces';
import { Products } from '@/services';
import { formatImagesURI, toast } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { FormikErrors } from 'formik';
import axios from 'axios';

type SetFieldValueCallback = (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
) => Promise<void | FormikErrors<NewProductInfo>>;

export const useProductDetail = (productId: string) => {
    const [isUploadingImages, setIsUploadingImages] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigation =
        useNavigation<ProductDetailScreenNavigationProp['navigation']>();
    const queryClient = useQueryClient();
    const {
        data: product,
        isLoading,
        isFetching
    } = useQuery({
        queryKey: ['productDetail'],
        queryFn: () => Products.loadProductById(productId)
    });

    const { mutate: saveProduct, isPending: isPendingSaveProduct } =
        useMutation({
            mutationFn: Products.saveProduct,
            onSuccess: () => {
                navigation.goBack();
                toast({
                    type: 'success',
                    message: 'Product created succesfully'
                });
            },
            onError: (error) => {
                toast({ type: 'error', message: error.message });
            }
        });

    const { mutate: updateProductById, isPending: isPendingUpdateProductById } =
        useMutation({
            mutationFn: (productUpdated: ProductInfo) =>
                Products.updateProduct(productUpdated),
            onSuccess: (data) => {
                queryClient.invalidateQueries({
                    queryKey: ['products', 'infinite']
                });
                queryClient.invalidateQueries({
                    queryKey: ['productDetail', data.id]
                });
                navigation.goBack();
                toast({
                    type: 'success',
                    message: 'Product updated succesfully'
                });
            },
            onError: (error) => {
                toast({ type: 'error', message: error.message });
            }
        });

    const handleUploadFileImages = async (images: string[]) => {
        if (!images.length) return [];
        const uploadImagesPromises = await images.map(Products.uploadImage);
        return await Promise.all(uploadImagesPromises);
    };

    const onSubmit = useCallback(
        async ({ price, stock, ...rest }: NewProductInfo) => {
            try {
                setIsUploadingImages(true);
                const uploadImagesUri = await handleUploadFileImages(
                    rest.images.filter((image) => image.includes('file://'))
                );
                const originalImagesURI = rest.images
                    .filter((image) => !image.includes('file://'))
                    .map(formatImagesURI);
                const parsedProduct = {
                    ...rest,
                    price: Number(price),
                    stock: Number(stock),
                    images: [
                        ...originalImagesURI,
                        ...uploadImagesUri
                    ] as string[]
                };
                setIsUploadingImages(false);
                productId === 'newProduct'
                    ? saveProduct(parsedProduct)
                    : updateProductById({ ...parsedProduct, id: productId });
            } catch (error) {
                toast({
                    type: 'error',
                    message: axios.isAxiosError(error)
                        ? error.message
                        : 'error uploading images to server'
                });
                setIsUploadingImages(false);
            }
        },
        [productId, saveProduct, updateProductById]
    );

    const toggleModal = () => setIsModalOpen((prev) => !prev);

    const pickImage = useCallback(
        async (setFieldValue: SetFieldValueCallback, images: string[]) => {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1,
                selectionLimit: 10,
                allowsMultipleSelection: true
            });

            if (result.assets) {
                const imagesToAdd = result.assets.map((asset) => asset.uri);
                setFieldValue('images', [...images, ...imagesToAdd]);
            }
        },
        []
    );

    const takePicture = useCallback(
        async (setFieldValue: SetFieldValueCallback, images: string[]) => {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1
            });

            if (result.assets) {
                setFieldValue('images', [...images, result.assets[0].uri]);
            }
        },
        []
    );

    const isLoadingInitialData = isLoading || isFetching;
    const isLoadingCreateOrSaveProduct =
        isPendingSaveProduct || isPendingUpdateProductById || isUploadingImages;

    return {
        product,
        isLoadingCreateOrSaveProduct,
        isLoadingInitialData,
        onSubmit,
        toggleModal,
        pickImage,
        takePicture,
        isModalOpen
    };
};

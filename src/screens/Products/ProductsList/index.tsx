import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { IconButton, Loader, ProductCard, Separator } from '@/components';
import { ProductInfo, ProductsScreenNavigationProp } from '@/interfaces';
import { Products } from '@/services';

import { useInfiniteQuery } from '@tanstack/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';

const ItemSeparatorComponent = () => <Separator height={8} />;
const ListFooterComponent = () => <Separator height={50} />;

export const ProductsScreen = ({
    navigation
}: ProductsScreenNavigationProp) => {
    const [isRefreshingData, setIsRefreshingData] = useState(false);

    const { data, isLoading, fetchNextPage, refetch } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 1000 * 60 * 60,
        queryFn: async (params) => {
            setIsRefreshingData(false);
            return await Products.loadProducts(params.pageParam);
        },
        initialPageParam: 0,
        getNextPageParam: (_, allPages) => allPages.length
    });

    const onRefresh = async () => {
        setIsRefreshingData(true);
        refetch();
    };

    const onEndReached = () => {
        fetchNextPage();
    };

    const handleOnPressCard = useCallback(
        (id: string, name: string) =>
            navigation.navigate('ProductDetailScreen', {
                productId: id,
                productName:
                    name.length > 20 ? name.slice(0, 20).concat('...') : name
            }),
        [navigation]
    );

    const handleOnPressButton = useCallback(
        () =>
            navigation.navigate('ProductDetailScreen', {
                productId: 'newProduct',
                productName: 'New Product'
            }),
        [navigation]
    );

    const renderHeaderRightContent = useCallback(() => {
        return (
            <View style={styles.headerRightButton}>
                <Ionicons.Button
                    name="menu"
                    size={32}
                    color="black"
                    backgroundColor={'white'}
                    activeOpacity={0.9}
                    onPress={() => navigation.openDrawer()}
                />
            </View>
        );
    }, [navigation]);

    const renderItem = useCallback(
        ({ item }: { item: ProductInfo }) => {
            return (
                <ProductCard
                    productName={item.title}
                    image={item.images[0]}
                    handleOnPressCard={() =>
                        handleOnPressCard(item.id, item.title)
                    }
                />
            );
        },
        [handleOnPressCard]
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: renderHeaderRightContent
        });
    }, [navigation, renderHeaderRightContent]);

    if (isLoading) {
        return <Loader isVisible />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                columnWrapperStyle={styles.listBox}
                data={data?.pages.flat() ?? []}
                numColumns={2}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={renderItem}
                onEndReachedThreshold={0.9}
                onEndReached={onEndReached}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListFooterComponent={ListFooterComponent}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshingData}
                        onRefresh={onRefresh}
                    />
                }
            />
            <View style={styles.addButtonBox}>
                <IconButton {...{ handleOnPressButton }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        paddingBottom: 0
    },
    headerRightButton: { marginRight: 4 },
    addButtonBox: {
        position: 'absolute',
        bottom: 16,
        right: 16
    },
    listBox: {
        flex: 1,
        justifyContent: 'space-between'
    }
});

import { Product, ProductInfo } from '@/interfaces';

export const apiToProducts = (products: Product[]): ProductInfo[] => {
    if (!products.length) return [];
    return products.map(({ images, ...rest }) => ({
        id: rest.id,
        title: rest.title,
        price: rest.price,
        description: rest.description,
        slug: rest.slug,
        stock: rest.stock,
        sizes: rest.sizes,
        gender: rest.gender,
        tags: rest.tags,
        images: images.map(
            (image) =>
                `${process.env.EXPO_PUBLIC_MERN_API_URL}/files/product/${image}`
        )
    }));
};

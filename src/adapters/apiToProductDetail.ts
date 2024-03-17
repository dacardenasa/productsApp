import { NewProductInfo, Product } from '@/interfaces';

export const apiToProductDetail = (product: Product): NewProductInfo => {
    return {
        title: product.title,
        price: product.price,
        description: product.description,
        slug: product.slug,
        stock: product.stock,
        sizes: product.sizes,
        gender: product.gender,
        tags: product.tags,
        images: product.images.map(
            (image) =>
                `${process.env.EXPO_PUBLIC_MERN_API_URL}/files/product/${image}`
        )
    };
};

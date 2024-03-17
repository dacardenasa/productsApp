import { cafeAPI } from '@/utils';
import { NewProductInfo, Product, ProductInfo } from '@/interfaces';
import { apiToProductDetail, apiToProducts } from '@/adapters';
import { newProduct } from '@/constants/global';

export const Products = {
    loadProducts: async (
        page: number,
        limit: number = 25
    ): Promise<ProductInfo[]> => {
        const { data } = await cafeAPI.get<Product[]>(
            `/products?offset=${page * 10}&limit=${limit}`
        );
        const mappedProducts = apiToProducts(data);
        return mappedProducts;
    },
    loadProductById: async (productId: string): Promise<NewProductInfo> => {
        if (productId === 'newProduct') return newProduct;
        const { data } = await cafeAPI.get<Product>(`/products/${productId}`);
        const parsedProduct = apiToProductDetail(data);
        return parsedProduct;
    },
    saveProduct: async (product: NewProductInfo) => {
        const { data } = await cafeAPI.post<Product>(`/products`, {
            ...product
        });
        return data;
    },
    updateProduct: async ({ id, ...rest }: ProductInfo) => {
        console.info({ rest, id });
        const { data } = await cafeAPI.patch<Product>(`/products/${id}`, {
            ...rest
        });
        return data;
    },
    uploadImage: async (image: string) => {
        const formData = new FormData();
        formData.append('file', {
            uri: image,
            type: 'image/jpeg',
            name: image.split('/').pop()
        } as unknown as Blob);
        const { data } = await cafeAPI.post<{ image: string }>(
            `/files/product`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return data.image;
    }
};

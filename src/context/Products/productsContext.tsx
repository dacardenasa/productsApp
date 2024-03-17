import React, { createContext, useState } from 'react';

import { Product } from '@/interfaces';

export type ProductsContextsProps = {
    products: Product[];
    loadProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    loadProductById: (product: Product) => void;
};

export const productsContext = createContext({} as ProductsContextsProps);

export const ProductsProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [productsState, setProductsState] = useState<Product[]>([]);
    const loadProducts = (products: Product[]) => setProductsState(products);
    const addProduct = (product: Product) =>
        setProductsState((c) => [...c, product]);
    const updateProduct = (product: Product) =>
        setProductsState((c) =>
            c.map((p) => (p.id === product.id ? { ...p, ...product } : p))
        );
    const deleteProduct = (productId: string) =>
        setProductsState((c) => c.filter((p) => p.id !== productId));
    const loadProductById = (product: Product) => setProductsState([product]);

    return (
        <productsContext.Provider
            value={{
                products: productsState,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById
            }}
        >
            {children}
        </productsContext.Provider>
    );
};

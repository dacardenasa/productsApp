import { User } from './auth';

export type Product = {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: Size[];
    gender: Gender;
    tags: string[];
    images: string[];
    user: User;
};

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Gender = 'kid' | 'men' | 'women' | 'unisex';

export type ProductInfo = Omit<Product, 'user'>;

export type NewProductInfo = Omit<Product, 'user' | 'id'>;

export type Role = 'admin';

export const enum Sizes {
    'XS' = 'XS',
    'S' = 'S',
    'M' = 'M',
    'L' = 'L',
    'XL' = 'XL',
    'XXL' = 'XXL'
}

export const enum Genders {
    'kid' = 'kid',
    'men' = 'men',
    'women' = 'women',
    'unisex' = 'unisex'
}

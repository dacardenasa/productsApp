import { Genders, NewProductInfo, Sizes } from '@/interfaces';

export const sizesList = [
    Sizes.XS,
    Sizes.S,
    Sizes.M,
    Sizes.L,
    Sizes.XL,
    Sizes.XXL
];
export const gendersList = [
    Genders.kid,
    Genders.men,
    Genders.women,
    Genders.unisex
];

export const newProduct: NewProductInfo = {
    description: '',
    gender: Genders.unisex,
    images: [],
    price: 0,
    sizes: [],
    slug: '',
    stock: 0,
    tags: [],
    title: ''
};

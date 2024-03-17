import {
    RootPrivateStackParamList,
    RootPublicStackParamList,
    RootStackParamsList
} from '@/navigation';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProductsScreenNavigationProp = CompositeScreenProps<
    DrawerScreenProps<RootPrivateStackParamList, 'ProductsScreen'>,
    NativeStackScreenProps<RootStackParamsList>
>;
export type ProductDetailScreenNavigationProp = CompositeScreenProps<
    DrawerScreenProps<RootPrivateStackParamList, 'ProductDetailScreen'>,
    NativeStackScreenProps<RootStackParamsList>
>;
export type LoginScreenNavigationProp = NativeStackScreenProps<
    RootPublicStackParamList,
    'LoginScreen'
>;
export type RegisterScreenNavigationProp = NativeStackScreenProps<
    RootPublicStackParamList,
    'RegisterScreen'
>;

import { RootStackParamsList } from '@/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamsList,
    'HomeScreen'
>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamsList,
    'LoginScreen'
>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamsList,
    'RegisterScreen'
>;

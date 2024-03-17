import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

type ToastArgs = {
    type: ToastType;
    message: string;
};

export const toast = ({ type, message }: ToastArgs) => {
    Toast.show({
        type,
        text1: message
    });
};

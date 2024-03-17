import React, { useContext } from 'react';
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { useForm } from '@/hooks';
import { themeStyles } from '@/theme';
import { Loader, Separator, Textfield, WhiteLogo } from '@/components';
import { RegisterScreenNavigationProp } from '@/interfaces';
import { useMutation } from '@tanstack/react-query';
import { Auth } from '@/services';
import { toast } from '@/utils';
import { AuthContext } from '@/context';

const initialState = {
    email: '',
    fullName: '',
    password: ''
};

const LoginScreen = ({ navigation }: RegisterScreenNavigationProp) => {
    const { login } = useContext(AuthContext);
    const { email, fullName, password, onChange } = useForm(initialState);

    const handleChangeField = (
        field: keyof typeof initialState,
        value: string
    ) => onChange(value, field);

    const { mutate: registerUser, isPending } = useMutation({
        mutationFn: Auth.register,
        onSuccess: (user) => {
            login(user);
            toast({ type: 'success', message: `Welcome ${user.fullName}` });
        },
        onError: (error) => {
            toast({ type: 'error', message: error.message });
        }
    });

    const handleRegister = () => {
        registerUser({
            email,
            fullName,
            password
        });
        Keyboard.dismiss();
    };

    const goToLogin = () => navigation.replace('LoginScreen');

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            <Loader isVisible={isPending} />
            <View style={themeStyles.formContainer}>
                <WhiteLogo />
                <Separator height={16} />
                <Text style={themeStyles.title}>Register</Text>
                <Separator height={8} />
                <Textfield
                    type="default"
                    label="Name"
                    textfieldProps={{
                        value: fullName,
                        onChangeText: (value) =>
                            handleChangeField('fullName', value),
                        placeholder: 'Type your name',
                        placeholderTextColor: 'rgba(255, 255, 255,0.4)',
                        autoCapitalize: 'words',
                        autoCorrect: false,
                        style: styles.textField
                    }}
                />
                <Separator height={8} />
                <Textfield
                    type="default"
                    label="Email"
                    textfieldProps={{
                        value: email,
                        onChangeText: (value) =>
                            handleChangeField('email', value),
                        placeholder: 'Type your email',
                        placeholderTextColor: 'rgba(255, 255, 255,0.4)',
                        keyboardType: 'email-address',
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        style: styles.textField
                    }}
                />
                <Separator height={8} />
                <Textfield
                    type="default"
                    label="Password"
                    textfieldProps={{
                        value: password,
                        onChangeText: (value) =>
                            handleChangeField('password', value),
                        placeholder: 'Type your password',
                        placeholderTextColor: 'rgba(255, 255, 255,0.4)',
                        secureTextEntry: true,
                        onSubmitEditing: handleRegister,
                        autoCapitalize: 'none',
                        autoCorrect: false,
                        style: styles.textField
                    }}
                />
                <Separator height={16} />
                <TouchableOpacity
                    disabled={!email.length || !password.length}
                    activeOpacity={0.8}
                    style={themeStyles.formButton}
                    onPress={handleRegister}
                >
                    <Text style={themeStyles.formButtonText}>
                        Create account
                    </Text>
                </TouchableOpacity>
                <Separator height={16} />
                <TouchableOpacity
                    style={themeStyles.newAccountButton}
                    activeOpacity={0.8}
                    onPress={goToLogin}
                >
                    <Text style={themeStyles.formButtonText}>
                        Back to Login
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5856d6'
    },
    scrollContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        height: 'auto',
        paddingVertical: 4,
        borderColor: 'white',
        borderBottomWidth: 1,
        color: 'white'
    }
});

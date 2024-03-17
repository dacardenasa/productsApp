import React, { useContext } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { useForm } from '@/hooks';
import { themeStyles } from '@/theme';
import {
    Background,
    Loader,
    Separator,
    Textfield,
    WhiteLogo
} from '@/components';
import { LoginData, LoginScreenNavigationProp } from '@/interfaces';
import { useMutation } from '@tanstack/react-query';
import { Auth } from '@/services';
import { toast } from '@/utils';
import { AuthContext } from '@/context';

const LoginScreen = ({ navigation }: LoginScreenNavigationProp) => {
    const { login } = useContext(AuthContext);
    const { email, password, onChange } = useForm({ email: '', password: '' });
    const handleEmailChange = (value: string) => onChange(value, 'email');
    const handlePasswordChange = (value: string) => onChange(value, 'password');

    const { mutate: loginUser, isPending } = useMutation({
        mutationFn: (payload: LoginData) =>
            Auth.login(payload.email, payload.password),
        onSuccess: (user) => {
            login(user);
            toast({ type: 'success', message: `Welcome ${user.fullName}` });
        },
        onError: (error) => {
            toast({ type: 'error', message: error.message });
        }
    });

    const handleLogin = async () => {
        Keyboard.dismiss();
        loginUser({ email, password });
    };

    const goToRegister = () => navigation.replace('RegisterScreen');

    return (
        <>
            <Loader isVisible={isPending} />
            <Background />
            <KeyboardAvoidingView
                style={StyleSheet.absoluteFillObject}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={themeStyles.formContainer}>
                    <WhiteLogo />
                    <Separator height={16} />
                    <Text style={themeStyles.title}>Login</Text>
                    <Separator height={8} />
                    <Textfield
                        type="default"
                        label="Email"
                        textfieldProps={{
                            value: email,
                            onChangeText: handleEmailChange,
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
                            onChangeText: handlePasswordChange,
                            placeholder: 'Type your password',
                            placeholderTextColor: 'rgba(255, 255, 255,0.4)',
                            secureTextEntry: true,
                            onSubmitEditing: handleLogin,
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
                        onPress={handleLogin}
                    >
                        <Text style={themeStyles.formButtonText}>Login</Text>
                    </TouchableOpacity>
                    <Separator height={16} />
                    <TouchableOpacity
                        style={themeStyles.newAccountButton}
                        activeOpacity={0.8}
                        onPress={goToRegister}
                    >
                        <Text style={themeStyles.formButtonText}>
                            Create account
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    textField: {
        height: 'auto',
        paddingVertical: 4,
        borderColor: 'white',
        borderBottomWidth: 1,
        color: 'white'
    }
});

export default LoginScreen;

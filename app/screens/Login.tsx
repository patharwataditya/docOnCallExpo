import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Basic email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch(
                'https://4nibhbfbk5.execute-api.ap-south-1.amazonaws.com/test/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );

            const data = await response.json();
            
            if (response.ok) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Login Failed', data.message || 'Unable to login');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error or server unavailable');
        }
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    loginButton: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 4,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    signupButton: {
        marginTop: 16,
    },
    signupText: {
        color: 'blue',
    },
});

export default LoginScreen;
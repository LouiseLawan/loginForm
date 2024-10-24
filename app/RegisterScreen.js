// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { auth } from './firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const LoginBox = styled.View`
  background-color: rgba(255, 255, 255, 0.75);
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  elevation: 10;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  height: 50px;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
  color: black;
`;

const Button = styled.TouchableOpacity`
  background-color: black;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const LinkText = styled.Text`
  color: black;
  text-align: center;
  margin-top: 10px;
`;

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const router = useRouter();

  const handleRegister = async () => {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercasePattern = /[A-Z]/;

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    if (!specialCharPattern.test(password) || !uppercasePattern.test(password)) {
      Alert.alert('Error', 'Password must contain at least one special character and one uppercase letter');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Register the user
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Registration successful');

      // Redirect to LoginScreen after registration
      router.push('/LoginScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BackgroundImage />
      <LoginBox>
        <Title>Register</Title>
        <Input
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button onPress={handleRegister}>
          <ButtonText>Sign Up</ButtonText>
        </Button>

        <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
          <LinkText>Already have an account? Login</LinkText>
        </TouchableOpacity>
      </LoginBox>
    </Container>
  );
}

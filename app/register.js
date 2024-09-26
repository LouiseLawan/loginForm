import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginBox from '../components/LoginBox';

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercasePattern = /[A-Z]/;

    if (password.length < 8 || !specialCharPattern.test(password) || !uppercasePattern.test(password)) {
      Alert.alert('Error', 'Password must meet requirements.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const existingUsersJSON = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

      const userExists = existingUsers.some((user) => user.username === username);
      if (userExists) {
        Alert.alert('Error', 'Username is already taken');
        return;
      }

      const newUser = { username, password };
      const updatedUsers = [...existingUsers, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      Alert.alert('Success', 'Registration successful!');
      router.push('/'); // Navigate back to Login Screen
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <LoginBox 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleRegister={handleRegister}
      />
    </Container>
  );
};

export default RegisterScreen;

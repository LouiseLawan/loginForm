import React, { useState } from 'react';
import { View, Text, Alert, StatusBar } from 'react-native';
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

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      const user = users.find((user) => user.username === username);

      if (user) {
        if (user.password === password) {
          setUsername('');
          setPassword('');
          router.push(`/welcome?username=${username}`); // Navigate to Welcome Screen
        } else {
          Alert.alert('Error', 'Incorrect password');
        }
      } else {
        Alert.alert('Error', 'User not found');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
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
        handleLogin={handleLogin}
        handleNavigation={() => router.push('/register')} // Navigate to Register Screen
      />
    </Container>
  );
};

export default LoginScreen;

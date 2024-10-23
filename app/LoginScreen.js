// LoginScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import { auth } from './firebaseConfig'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { UserContext } from './UserContext'; // Import your UserContext if using context

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
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

export default function LoginScreen() {
  const { setLoggedInUser } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('loggedInUser');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setLoggedInUser(user);
          router.replace(`/WelcomeScreen?email=${user.email}`);
        }
      } catch (error) {
        console.error('Error reading login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [setLoggedInUser, router]);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user email in AsyncStorage
      await AsyncStorage.setItem('loggedInUser', JSON.stringify({ email: user.email }));

      setLoggedInUser({ email: user.email });
      setEmail('');
      setPassword('');
      router.replace(`/WelcomeScreen?email=${user.email}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <LoginBox>
        <Title>Login</Title>
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
        <Button onPress={handleLogin}>
          <ButtonText>Login</ButtonText>
        </Button>
        <TouchableOpacity onPress={() => router.push('/RegisterScreen')}>
          <LinkText>Don't have an account? Register</LinkText>
        </TouchableOpacity>
      </LoginBox>
    </Container>
  );
}

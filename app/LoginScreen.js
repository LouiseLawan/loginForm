
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { UserContext } from '/UserContext'; 

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
  const { loggedInUser, setLoggedInUser } = useContext(UserContext); // Access context
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        if (loggedInUser) {
          router.push(`/WelcomeScreen?username=${loggedInUser.username}`);
        } else {
          const savedUser = await AsyncStorage.getItem('loggedInUser');
          if (savedUser) {
            const user = JSON.parse(savedUser);
            setLoggedInUser(user);
            router.push(`/WelcomeScreen?username=${user.username}`);
          }
        }
      } catch (error) {
        console.error('Error reading login status:', error);
      }
    };

    checkLoginStatus();
  }, [loggedInUser, setLoggedInUser]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersJSON = await AsyncStorage.getItem('users');
        setUsers(usersJSON ? JSON.parse(usersJSON) : []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async () => {
    try {
      const user = users.find((user) => user.username === username);

      if (user) {
        if (user.password === password) {
     
          await AsyncStorage.setItem('loggedInUser', JSON.stringify({ username }));
          setLoggedInUser({ username });
          setUsername('');
          setPassword('');
          router.push(`/WelcomeScreen?username=${username}`);
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
      <LoginBox>
        <Title>Login</Title>
        <Input
          placeholder="Username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
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

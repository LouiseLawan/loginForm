import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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
  background-color: rgba(255, 255, 255, 0.75) ;
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

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
  
      const user = users.find((user) => user.username === username && user.password === password);
  
      if (user) {
        Alert.alert('Success', 'Login successful!');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BackgroundImage />
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
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <LinkText>Don't have an account? Register</LinkText>
        </TouchableOpacity>
      </LoginBox>
    </Container>
  );
}

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
  
    if (username === '' || password === '') {
      Alert.alert('Error', 'Username and Password cannot be empty');
      return;
    }
  
    try {
      const existingUsersJSON = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
  
      // Check if the username already exists
      const userExists = existingUsers.some((user) => user.username === username);
  
      if (userExists) {
        Alert.alert('Error', 'Username is already taken');
        return;
      }
  
      const newUser = { username, password };
      const updatedUsers = [...existingUsers, newUser];
  
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
  
      Alert.alert('Success', 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'An error occurred during registration');
    }
  };
  
  

  const checkStoredData = async () => {
    try {
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
  
      if (users.length > 0) {
        let userData = users.map((user, index) => `User ${index + 1}:\nUsername: ${user.username}\nPassword: ${user.password}`).join('\n\n');
        Alert.alert('Stored Data', userData);
      } else {
        Alert.alert('No Data', 'No data found in the database.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to retrieve stored data.');
      console.log('Error retrieving stored data:', error);
    }
  };
  

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BackgroundImage />
      <LoginBox>
        <Title>Register</Title>
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

        <Button onPress={checkStoredData} style={{ marginTop: 10 }}>
          <ButtonText>Check Database</ButtonText>
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <LinkText>Already have an account? Login</LinkText>
        </TouchableOpacity>
      </LoginBox>
    </Container>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

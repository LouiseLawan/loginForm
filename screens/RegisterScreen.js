import React, { useState } from 'react';
import { Alert, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  Container, 
  BackgroundImage, 
  LoginBox, 
  Title, 
  Input, 
  Button, 
  ButtonText, 
  LinkText 
} from '../components/StyledComponents';

function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/; 
    const uppercasePattern = /[A-Z]/; 
  
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
  
    if (!specialCharPattern.test(password)) {
      Alert.alert('Error', 'Password must contain at least one special character');
      return;
    }
  
    if (!uppercasePattern.test(password)) {
      Alert.alert('Error', 'Password must contain at least one uppercase letter');
      return;
    }
  
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
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <LinkText>Already have an account? Login</LinkText>
        </TouchableOpacity>
      </LoginBox>
    </Container>
  );
}

export default RegisterScreen;

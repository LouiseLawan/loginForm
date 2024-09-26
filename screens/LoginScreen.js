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

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
  
      const user = users.find((user) => user.username === username);
  
      if (user) {
        if (user.password === password) {
          setUsername('');
          setPassword('');
          navigation.navigate('Welcome', { username });
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
        <TouchableOpacity onPress={() => {
          setUsername(''); 
          setPassword(''); 
          navigation.navigate('Register');
        }}>
          <LinkText>Don't have an account? Register</LinkText>
        </TouchableOpacity>
      </LoginBox>
    </Container>
  );
}

export default LoginScreen;

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import styled from 'styled-components/native';

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

export default function App() {
  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <BackgroundImage />
      <LoginBox>
        <Title>Login</Title>
        <Input placeholder="Email ID" placeholderTextColor="gray" />
        <Input placeholder="Password" placeholderTextColor="gray" secureTextEntry={true} />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button>
          <ButtonText>Login</ButtonText>
        </Button>
        <LinkText>Don't have an account? Register</LinkText>
      </LoginBox>
    </Container>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    color: 'black',
    textAlign: 'right',
    marginBottom: 15,
  },
});

import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const DashboardBox = styled.View`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  width: 85%;
  elevation: 10;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.View`
  margin-bottom: 20px;
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

export default function WelcomeScreen() {
  const { username } = useLocalSearchParams();
  const router = useRouter();

  // Memoizing the greeting message
  const greetingMessage = useMemo(() => `Welcome, ${username}!`, [username]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      router.push(`/LoginScreen`);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <DashboardBox>
        <Title>{greetingMessage}</Title>
        <Section>
          <Button onPress={handleLogout}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </Section>
      </DashboardBox>
    </Container>
  );
}

import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
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

  const handleLogout = () => {
    router.push(`/LoginScreen`);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <DashboardBox>
        <Title>Welcome, {username}!</Title>
        <Section>
          <Button onPress={handleLogout}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </Section>
      </DashboardBox>
    </Container>
  );
}